import React, {useEffect, useState} from 'react';
import {processColor, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {AppLoading, AppText} from '../../../components/atoms';
import {ServiceHandle} from '../../../services';
import {Colors, Mixin} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {FONT_SIZE_16} from '../../../styles/Typography';
import {Const, trans} from '../../../utils';
import numeral from 'numeral';
import {BarChart} from 'react-native-charts-wrapper';
import {sum} from 'lodash';
import moment from 'moment';

const ShopReport = ({navigation, route}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const customer = route.params.item;

  const [data, setData] = useState();
  const [xAxis, setAxis] = useState();

  const [yAxis] = useState({
    left: {
      drawGridLines: true,
      axisMinimum: 1,
    },
    right: {
      enabled: false,
    },
  });

  const [legend] = useState({
    enabled: true,
    textSize: 14,
    form: 'SQUARE',
    formSize: 14,
    wordWrapEnabled: false,
  });

  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getShopReport = () => {
      const params = {
        customerId: customer.partyId,
      };
      ServiceHandle.get(Const.API.GetCustomerReports, params).then(res => {
        if (res.ok) {
          const amountArr = res.data.lastFiveOrders
            .map(elm => {
              return Number(elm.grand_total) / 1000;
            })
            .reverse();

          const timeArr = res.data.lastFiveOrders
            .map(elm => {
              return moment(elm.entry_date).format('DD-MM-YYYY');
            })
            .reverse();

          setTotalPrice(sum(amountArr) * 1000);
          console.log('amountArr', amountArr);

          setData({
            dataSets: [
              {
                values: amountArr,
                label: 'Đơn vị : Nghìn đồng',
                config: {
                  color: processColor(Colors.GREEN_1),
                  barShadowColor: processColor('lightgrey'),
                  highlightAlpha: 90,
                  highlightColor: processColor('red'),
                  valueFormatter: '#.##',
                },
              },
            ],
            config: {
              barWidth: 0.8,
            },
          });
          setAxis({
            valueFormatter: timeArr,
            granularityEnabled: true,
            granularity: 1,
            drawGridLines: false,
            position: 'BOTTOM',
          });
        } else {
          SimpleToast.show(res.error);
        }
      });
    };
    getShopReport();
  }, [customer.partyId]);

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Báo cáo cửa hàng" />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.containerChart}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <AppText title style={styles.txtRevenue}>
              {trans('revenue').toUpperCase()}
            </AppText>
            <AppText title style={styles.txtRevenue}>
              {numeral(totalPrice).format()} đ
            </AppText>
          </View>
          <BarChart
            style={styles.chart}
            data={data}
            xAxis={xAxis}
            yAxis={yAxis}
            animation={{durationY: 1500}}
            legend={legend}
            gridBackgroundColor={processColor('#ffffff')}
            visibleRange={{x: {min: 5, max: 5}}}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={false}
            chartDescription={{text: ''}}
            extraOffsets={{bottom: 10}}
          />
          <AppText style={{marginLeft: 20, marginTop: 4, fontWeight: 'bold'}}>
            (*) Báo cáo doanh thu được tổng hợp từ 5 đơn hàng gần nhất
          </AppText>
        </View>
      </View>
      <View style={{flex: 1}} />
    </View>
  );
};
export default ShopReport;

const styles = {
  container: {
    flex: 2,
    backgroundColor: Colors.BACKGROUND_COLOR,
    padding: 20,
  },
  contentContainer: {
    flex: 1,
  },
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: Mixin.moderateSize(80),
  },
  containerChart: {
    flex: 2,
    padding: 16,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 16,
  },
  chart: {
    flex: 1,
  },
  txtRevenue: {
    fontWeight: 'bold',
  },
};

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
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

const SalesmanReport = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const [loading, setLoading] = useState(false);
  const [dataDay, setDataDay] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);

  useEffect(() => {
    const getSalesman = () => {
      ServiceHandle.get(Const.API.GetTurnoverBySalesmanReports).then(res => {
        if (res.ok) {
          setDataDay(res.data.dayReport);
          setDataMonth(res.data.monthReport);
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      });
    };
    getSalesman();
  }, []);

  const dataReportDay = [
    {title: 'Số lượng sản phẩm', value: dataDay.total},
    {title: trans('orderNumber'), value: dataDay.itemsQuantity},
    {
      title: trans('sales'),
      value: `${numeral(dataDay.salesValue).format()} đ`,
    },
  ];
  const dataReportMonth = [
    {title: 'Số lượng sản phẩm', value: dataMonth.total},
    {
      title: trans('orderNumber'),
      value: dataMonth.itemsQuantity,
    },
    {
      title: trans('sales'),
      value: `${numeral(dataMonth.salesValue).format()} đ`,
    },
  ];

  const renderItem = (elm, index) => {
    return (
      <View key={index} style={styles.containerItem}>
        <AppText>{elm.title}</AppText>
        <AppText>{elm.value}</AppText>
      </View>
    );
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Báo cáo Salesman" />
      </Appbar.Header>
      <View style={styles.content}>
        <View style={styles.viewTypeReport}>
          <AppText style={styles.typeReport}>{trans('byDate')}</AppText>
        </View>
        {dataReportDay?.map((elm, index) => renderItem(elm, index))}
        <View style={styles.viewTypeReport}>
          <AppText style={styles.typeReport}>{trans('byMonth')}</AppText>
        </View>
        {dataReportMonth?.map((elm, index) => renderItem(elm, index))}
      </View>
    </View>
  );
};
export default SalesmanReport;

const styles = {
  contentContainer: {
    flex: 1,
  },
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: Mixin.moderateSize(80),
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Mixin.moderateSize(16),
  },
  typeReport: {
    fontWeight: 'bold',
    paddingVertical: Mixin.moderateSize(12),
  },
  content: {
    marginHorizontal: Mixin.moderateSize(12),
  },
  viewTypeReport: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.BLACK,
  },
};

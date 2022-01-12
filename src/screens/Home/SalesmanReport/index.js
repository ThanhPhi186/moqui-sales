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
import {Const} from '../../../utils';

const SalesmanReport = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSalesman = () => {
      ServiceHandle.get(Const.API.GetTurnoverBySalesmanReports).then(res => {
        if (res.ok) {
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      });
    };
    getSalesman();
  }, []);

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Báo cáo Salesman" />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <AppText style={styles.txtEmpty}>Tính năng đang phát triển</AppText>
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
};

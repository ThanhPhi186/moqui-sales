import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {AppLoading, AppText} from '../../../components/atoms';
import {ServiceHandle} from '../../../services';
import {Colors, Mixin} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import moment from 'moment';
import numeral from 'numeral';

const CancelOrderStatistic = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);
  const [cancelList, setCancelList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getListCancelOrder = () => {
      const params = {
        viewIndex: 0,
        viewSize: 200,
        productStoreId: store.productStoreId,
      };
      ServiceHandle.post(Const.API.GetListSalesTrackMobilemcs, params)
        .then(res => {
          if (res.ok) {
            setCancelList(res.data.listSalesTrack);
          } else {
            setTimeout(() => {
              SimpleToast.show(res.error, SimpleToast.SHORT);
            }, 700);
          }
        })
        .finally(() => setLoading(false));
    };
    getListCancelOrder();
  }, [store.productStoreId]);

  const renderItem = item => {
    return (
      <View style={styles.containerItem}>
        <AppText style={styles.nameProduct}>
          {item.createdByUserLogin} - {item.terminalId}
        </AppText>
        <AppText style={styles.txtInfo}>
          {item.transactionId} -{' '}
          {moment(item.createdDate, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY')}
        </AppText>
        <AppText style={styles.txtInfo}>{item.productCode}</AppText>
        <AppText style={styles.txtInfo}>{item.productName}</AppText>
        <AppText style={styles.txtInfo}>
          {item.quantity} - {item.quantityUomName} -{' '}
          {numeral(item.unitPrice).format()} đ
        </AppText>
      </View>
    );
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('CancelOrderStatistic')} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <FlatList
          data={cancelList}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
export default CancelOrderStatistic;

const styles = {
  contentContainer: {
    flex: 1,
  },
  containerItem: {
    backgroundColor: Colors.WHITE,
    ...Mixin.margin(12, 12, 0, 12),
    ...Mixin.padding(12),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameProduct: {
    fontWeight: 'bold',
  },
  txtInfo: {
    fontStyle: 'italic',
    paddingTop: Mixin.moderateSize(8),
  },
};

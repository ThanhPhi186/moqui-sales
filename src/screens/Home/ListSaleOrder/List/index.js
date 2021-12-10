import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {NAVIGATION_NAME} from '../../../../navigations';
import {ServiceHandle} from '../../../../services';
import {Const, trans} from '../../../../utils';
import ItemOrder from '../../component/ItemOrder';

import styles from './styles';

const PAGE_SIDE = 20;
const ListSaleOrderScreen = ({navigation}) => {
  const [listOrder, setListOrder] = useState([]);
  const [totalData, setTotalData] = useState();
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  // const [loadMore, setLoadMore] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getListOrder = () => {
      setRefreshing(true);
      const params = {
        pagesize: PAGE_SIDE,
        pageIndex: page,
      };

      ServiceHandle.get(Const.API.GetSalesOrders, params)
        .then(res => {
          if (res.ok) {
            setTotalData(res.data.totalRows);
            setListOrder([...listOrder, ...res.data.orderList]);
          } else {
            setTimeout(() => {
              SimpleToast.show(res.error, SimpleToast.SHORT);
            }, 700);
          }
        })
        .finally(() => setRefreshing(false));
    };
    getListOrder();
  }, [page]);

  const refresh = () => {
    setRefreshing(true);
    const params = {
      pagesize: PAGE_SIDE,
      pageIndex: 0,
    };

    ServiceHandle.get(Const.API.GetSalesOrders, params)
      .then(res => {
        if (res.ok) {
          setTotalData(res.data.TotalRows);
          setListOrder(res.data.salesOrders);
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      })
      .finally(() => setRefreshing(false));
  };
  // console.log('xxx', listOrder.length, totalData);

  const onEndReached = () => {
    if (listOrder.length < totalData) {
      setPage(page + 1);
      console.log('aaaaaa', listOrder.length, totalData);
    } else {
      console.log('bbbbbb', listOrder.length, totalData);
    }
  };

  const renderItem = item => {
    return (
      <ItemOrder
        item={item}
        onPress={() =>
          navigation.navigate(NAVIGATION_NAME.OrderDetailScreen, {
            orderId: item.orderId,
          })
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('listSaleOrder')} />
      </Appbar.Header>
      <FlatList
        data={listOrder}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      />
    </View>
  );
};
export default ListSaleOrderScreen;

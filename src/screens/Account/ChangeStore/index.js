import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';

import {Const, trans} from '../../../utils';
import {AuthenOverallRedux, StoreRedux} from '../../../redux';
import {AppText} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {Colors} from '../../../styles';
import {ServiceHandle} from '../../../services';
import {NAVIGATION_NAME} from '../../../navigations';

const ChangeStore = ({navigation, route}) => {
  const {fromScreen} = route.params;
  const store = useSelector(state => state.StoreReducer.store);
  const dispatch = useDispatch();

  const [listStore, setListStore] = useState([]);

  useEffect(() => {
    const params = {
      viewIndex: 0,
      viewSize: 200,
    };
    ServiceHandle.get(Const.API.GetProductStores, params).then(res => {
      if (res.ok) {
        setListStore(res.data.productStoreList);
      }
    });
  }, []);

  const onChangeStore = item => {
    console.log('item', item);
    dispatch(StoreRedux.Actions.changeStore(item));
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'HomeScreen'}],
    // });
  };

  const handleBack = () => {
    if (fromScreen === NAVIGATION_NAME.LoginScreen) {
      dispatch(AuthenOverallRedux.Actions.handleLogout());
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  const renderItem = elm => {
    return (
      <TouchableOpacity
        disabled={store.productStoreId === elm.productStoreId}
        style={
          store.productStoreId === elm.productStoreId
            ? {...styles.btn, backgroundColor: Colors.PRIMARY}
            : styles.btn
        }
        onPress={() => onChangeStore(elm)}>
        <AppText
          style={
            store.productStoreId === elm.productStoreId
              ? {...styles.storeName, color: Colors.WHITE}
              : styles.storeName
          }>
          {elm.storeName}
        </AppText>
        <AppText
          style={
            store.productStoreId === elm.productStoreId
              ? {...styles.storeCode, color: Colors.WHITE}
              : styles.storeCode
          }>
          {elm.productStoreId}
        </AppText>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => {
    return <AppText style={styles.txtEmpty}>{trans('notStore')}</AppText>;
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title={trans('changeStore')} />
      </Appbar.Header>

      <FlatList
        data={listStore}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 8}}
      />
    </View>
  );
};
export default ChangeStore;

import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';
import {Const, trans} from '../../../../utils';
import styles from './styles';
import moment from 'moment';
import {Colors, Mixin} from '../../../../styles';
import FastImage from 'react-native-fast-image';
import {images} from '../../../../assets';
import {useDispatch, useSelector} from 'react-redux';

import {AppDialog} from '../../../../components/molecules';
import {AuthenOverallRedux} from '../../../../redux';
import {AppLoading, AppText} from '../../../../components/atoms';
import SimpleToast from 'react-native-simple-toast';
import {ServiceHandle} from '../../../../services';
import {NAVIGATION_NAME} from '../../../../navigations';

const PromotionScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);
  const store = useSelector(state => state.StoreReducer.store);

  const [modalLogout, setModalLogout] = useState(false);

  const [listPromotion, setListPromotion] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(false);

  console.log('store', store);

  useEffect(() => {
    const getPromotion = async () => {
      setLoading(true);
      try {
        // const params = {
        //   pageIndex: 0,
        //   pageSize: 0,
        //   storePromotionIdTerm: store.productStoreId,
        //   storeNameTerm: store.storeName,
        // };
        const res = await ServiceHandle.get(Const.API.GetPromoList);
        if (res.ok) {
          setListPromotion(res.data.promoList);
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getPromotion();
  }, [store, BaseUrl]);

  const onRefresh = async () => {
    setRefreshing(true);
    const params = {
      productStoreId: store,
    };
    const res = await ServiceHandle.get(Const.API.GetPromoList, params);
    if (res.ok) {
      setRefreshing(false);
      setListPromotion(res.data.promoList);
    }
  };

  const renderEmptyComponent = () => {
    return <AppText style={styles.txtEmpty}>{trans('emptyPromotion')}</AppText>;
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.containerItem}
        onPress={() =>
          navigation.navigate(NAVIGATION_NAME.PromotionDetail, {
            storePromotionId: item.storePromotionId,
          })
        }>
        <View
          style={{
            flex: 0.15,
            backgroundColor: Colors.GREEN_1,
            borderTopLeftRadius: Mixin.moderateSize(8),
            borderBottomLeftRadius: Mixin.moderateSize(8),
          }}
        />
        <View style={styles.left}>
          <FastImage source={images.discount} style={{width: 50, height: 50}} />
          <View style={{marginLeft: 12, flex: 1}}>
            <AppText style={styles.textTitle}>{item.itemDescription}</AppText>
            <AppText style={styles.textPrice}>
              HSD: {moment(item.thruDate).format('DD.MM.YYYY')}
            </AppText>
          </View>
        </View>

        <View>
          <View style={{flex: 1}} />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.LIGHT_GREY,
              flex: 1,
            }}
          />
          <View style={{flex: 1}} />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.LIGHT_GREY,
              flex: 1,
            }}
          />
          <View style={{flex: 1}} />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.LIGHT_GREY,
              flex: 1,
            }}
          />
          <View style={{flex: 1}} />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.LIGHT_GREY,
              flex: 1,
            }}
          />
          <View style={{flex: 1}} />
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.LIGHT_GREY,
              flex: 1,
            }}
          />
          <View style={{flex: 1}} />
        </View>
        <View style={styles.right}>
          <Text style={styles.textValue}>Sales</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.BACKGROUND_COLOR}}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content color="white" title={trans('myPromotion')} />
      </Appbar.Header>
      <FlatList
        data={listPromotion}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{padding: 12}}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <AppDialog
        content={trans('expiredToken')}
        isVisible={modalLogout}
        onPressClose={() => {
          setModalLogout(false);
          setTimeout(() => {
            dispatch(AuthenOverallRedux.Actions.logout.request());
          }, 700);
        }}
      />
    </View>
  );
};

export default PromotionScreen;

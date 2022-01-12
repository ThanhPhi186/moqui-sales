import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import styles from './styles';
import numeral from 'numeral';
import {ServiceHandle} from '../../../../services';
import {Const, trans} from '../../../../utils';
import {images} from '../../../../assets';
import {ItemInfo} from '../../../../components/molecules';
import SimpleToast from 'react-native-simple-toast';
import {AppText} from '../../../../components/atoms';

const OrderDetailScreen = ({navigation, route}) => {
  const [dataDetail, setDataDetail] = useState();
  const {orderId} = route.params;

  useEffect(() => {
    const params = {
      orderId,
    };
    ServiceHandle.get(Const.API.GetSalesOrderDetails, params).then(res => {
      if (res.ok) {
        setDataDetail(res.data.orderDetail);
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  }, [orderId]);

  const renderItem = item => {
    return (
      <View style={styles.containerItem}>
        <View style={styles.viewImg}>
          <FastImage
            resizeMode="contain"
            style={styles.img}
            source={
              item.largeImageUrl
                ? {uri: Const.API.baseImgURL + item.largeImageUrl}
                : images.noImage
            }
          />
        </View>
        <View style={styles.leftContent}>
          <AppText style={styles.nameProduct}>{item.itemDescription}</AppText>
          <AppText style={styles.info}>{item.productId}</AppText>
          <AppText style={styles.info}>
            {numeral(item.unitAmount).format()} đ
          </AppText>
        </View>
        <AppText containerStyle={styles.boxAmount}>
          {item.quantityCancelled}
        </AppText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('detailOrder')} />
      </Appbar.Header>

      <View style={styles.content}>
        <ItemInfo
          title={trans('customerCode')}
          value={dataDetail?.customer?.partyId}
        />
        <ItemInfo
          title={trans('customerName')}
          value={dataDetail?.customer.officeSiteName}
        />
        <ItemInfo title={trans('codeOrder')} value={dataDetail?.orderId} />
        <ItemInfo
          title={trans('address')}
          value={dataDetail?.customer.fullAddress}
        />
      </View>
      <View style={styles.content}>
        <ItemInfo
          title={trans('orderValue')}
          value={numeral(dataDetail?.grandTotal).format()}
          price
        />
        <ItemInfo
          title={trans('discount')}
          value={dataDetail?.discountAmount}
          price
        />
        <ItemInfo
          title={trans('tax')}
          value={numeral(dataDetail?.taxAmount).format()}
          price
        />
        <ItemInfo
          title={trans('totalPayable')}
          value={numeral(dataDetail?.grandTotal).format()}
          price
        />
      </View>
      <View style={[styles.content, {flex: 2}]}>
        <AppText style={styles.txtTitle}>{trans('itemsList')} :</AppText>
        <FlatList
          data={dataDetail?.orderItems}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};
export default OrderDetailScreen;

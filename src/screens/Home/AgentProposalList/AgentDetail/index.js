// import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import {images} from '../../../../assets';
import {AppText} from '../../../../components/atoms';
import {ItemInfo} from '../../../../components/molecules';
import {trans} from '../../../../utils';

import styles from './styles';

const AgentDetail = ({navigation, route}) => {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={data.customerId} />
      </Appbar.Header>
      <View style={styles.content}>
        <FastImage
          source={data.url ? {uri: data.url} : images.noImage}
          style={styles.img}
          resizeMode="contain"
        />
        <AppText style={styles.status}>
          {data.statusId === 'PARTY_APPROVED'
            ? trans('approved')
            : trans('unApproved')}
        </AppText>
        <ItemInfo title={trans('customerName')} value={data.customerName} />
        <ItemInfo title={trans('customerCode')} value={data.customerId} />
        <ItemInfo title={trans('phoneNumber')} phone={data.phone} />
        <ItemInfo title={trans('storeCode')} value={data.productStoreId} />
        <ItemInfo title={trans('storeName')} value={data.officeSiteName} />
        <ItemInfo title={trans('address')} value={data.address} />
      </View>
    </View>
  );
};
export default AgentDetail;

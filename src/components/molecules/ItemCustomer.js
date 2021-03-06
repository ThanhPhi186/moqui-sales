import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-paper';
import {images} from '../../assets';
import {Colors, Mixin} from '../../styles';
import {trans} from '../../utils';
import {AppText} from '../atoms';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// interface ItemCustomerProps {
//   item: Object;
//   containerStyle: Object
// }

const ItemCustomer = props => {
  const {
    item,
    containerStyle,
    type,
    checkInAndCheckOut,
    onInventory,
    onNearDate,
  } = props;

  return (
    <TouchableOpacity {...props} style={[styles.container, containerStyle]}>
      <FastImage
        source={item.logoImageUrl ? {uri: item.logoImageUrl} : images.noImage}
        style={styles.img}
        resizeMode="contain"
      />
      <View style={styles.leftContent}>
        <AppText style={styles.officeSiteName}>{item.officeSiteName}</AppText>
        <AppText style={styles.txtContent}>{item.fullAddress}</AppText>
        <View style={styles.viewRow}>
          <AppText>{item.telecomNumber}</AppText>

          {type === 'check-status' && (
            <View style={styles.viewStatus}>
              <AppText style={styles.status}>
                {(item.checkInOk === 'N' && item.checkOutOk === 'N'
                  ? trans('notVisited')
                  : item.checkInOk === 'Y' && item.checkOutOk === 'N'
                  ? trans('comming')
                  : trans('visited')
                ).toUpperCase()}
              </AppText>

              <MaterialCommunityIcons
                name={
                  item.checkInOk === 'N' && item.checkOutOk === 'N'
                    ? 'cart-plus'
                    : item.checkInOk === 'Y' && item.checkOutOk === 'N'
                    ? 'map-marker'
                    : 'check'
                }
                color={Colors.PRIMARY}
                size={20}
                style={styles.icon}
              />
            </View>
          )}
        </View>
        {type === 'create-order' && (
          <View style={styles.viewBtnGroup}>
            <Button mode="text" onPress={onNearDate}>
              {trans('nearDate')}
            </Button>
            {item.checkInOk === 'Y' && item.checkOutOk === 'Y' ? null : (
              <Button
                icon="map-marker"
                mode="text"
                labelStyle={styles.txtBtn}
                onPress={checkInAndCheckOut}>
                {item.checkInOk === 'N' ? trans('checkin') : trans('checkout')}
              </Button>
            )}
            <Button
              icon="store"
              mode="text"
              labelStyle={styles.txtBtn}
              onPress={onInventory}>
              {trans('inventory')}
            </Button>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default ItemCustomer;
const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    ...Mixin.padding(12, 12, 8, 12),
    borderBottomWidth: 2,
    borderColor: Colors.WHITE_SMOKE,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  leftContent: {
    flex: 1,
    paddingLeft: Mixin.moderateSize(12),
  },
  officeSiteName: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
  txtContent: {
    paddingTop: Mixin.moderateSize(6),
  },
  img: {
    width: Mixin.moderateSize(52),
    height: Mixin.moderateSize(52),
    borderRadius: 8,
  },
  viewBtnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  txtBtn: {
    marginLeft: 8,
  },
  status: {
    color: Colors.PRIMARY,
    fontWeight: '600',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Mixin.moderateSize(6),
  },
  viewStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: 8,
  },
};

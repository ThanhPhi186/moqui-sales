import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets';
import {Colors, Mixin} from '../../styles';
import {Const} from '../../utils';
import {AppText} from '../atoms';
import numeral from 'numeral';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardItem = props => {
  const {
    type,
    item,
    addAmountProps,
    lessAmountProps,
    styleProps,
    chooseExpDate,
    changeAmountProps,
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === 'choose' && {backgroundColor: Colors.WHITE_SMOKE},
        styleProps,
      ]}
      {...props}>
      <View style={styles.viewImg}>
        <FastImage
          resizeMode="contain"
          style={styles.img}
          source={
            item.image
              ? {uri: Const.API.baseImgURL + item.image}
              : images.noImage
          }
        />
      </View>
      <View style={styles.leftContent}>
        <AppText style={styles.nameProduct}>{item.productName}</AppText>
        <AppText style={styles.info}>
          {item.productCode}{' '}
          {(item.uomId || item.abbreviation) &&
            `(${item.uomId || item.abbreviation})`}
        </AppText>
        {chooseExpDate ? (
          <TouchableOpacity onPress={chooseExpDate}>
            <AppText style={styles.info}>
              {moment(item.expiredDate).format('DD/MM/YYYY')}
            </AppText>
          </TouchableOpacity>
        ) : (
          <AppText style={styles.info}>
            {item.priceVAT && numeral(item.priceVAT).format()}
          </AppText>
        )}
      </View>
      {type === 'choose' && (
        <>
          <View style={styles.viewQuantity}>
            <TouchableOpacity onPress={() => lessAmountProps(item)}>
              <Icon name="minus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TextInput
              style={styles.boxAmount}
              value={item.quantity.toString()}
              keyboardType="number-pad"
              onChangeText={valueInput => changeAmountProps(valueInput, item)}
            />
            <TouchableOpacity onPress={() => addAmountProps(item)}>
              <Icon name="plus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {type === 'readOnly' && (
        <AppText
          containerStyle={[
            styles.boxAmount,
            {marginRight: Mixin.moderateSize(16)},
          ]}>
          {item.quantity}
        </AppText>
      )}
    </TouchableOpacity>
  );
};
export default CardItem;

const styles = {
  container: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  boxAmount: {
    borderWidth: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.PRIMARY,
    textAlign: 'center',
    color: Colors.BLACK,
  },
  viewImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: Mixin.moderateSize(52),
    height: Mixin.moderateSize(52),
    borderRadius: 8,
  },
  leftContent: {
    flex: 3,
  },
  nameProduct: {
    fontWeight: 'bold',
  },
  info: {
    fontStyle: 'italic',
  },
  viewQuantity: {
    width: '32%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: Mixin.moderateSize(12),
  },
};

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Const} from '../../utils';
import {AppText} from '../atoms';
import numeral from 'numeral';
import {device_width} from '../../styles/Mixin';
import {Colors, Mixin} from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ItemProduct = props => {
  const {item, addToCart} = props;

  return (
    <View style={{flex: 1 / 2}}>
      <TouchableOpacity {...props} style={styles.container}>
        <FastImage
          resizeMode="contain"
          source={{
            uri: 'https://dongduocvuduc.net/wp-content/uploads/2020/01/avata-nuoc-hoa-hong-the-2.jpg',
          }}
          style={styles.image}
        />
        <View style={styles.viewNamePrice}>
          <AppText numberOfLines={1} style={styles.txtName}>
            {item.productName}
          </AppText>
          <AppText numberOfLines={1} style={styles.txtName}>
            ({item.uomDescription})
          </AppText>
          <AppText style={styles.txtPrice}>
            {numeral(item.priceVAT).format()} đ
          </AppText>
        </View>
        <TouchableOpacity style={styles.btnCart} onPress={addToCart}>
          <Icon name="cart-plus" size={18} color={Colors.WHITE} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
const styles = {
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    width: device_width / 2.4,
    alignSelf: 'center',
    paddingTop: 4,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: device_width / 2.75,
    aspectRatio: 1 / 1,
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 3,
    borderWidth: 0.7,
    borderColor: Colors.LIGHT_GREY,
  },
  txtName: {
    fontWeight: 'bold',
  },
  txtPrice: {
    fontWeight: 'bold',
    color: Colors.GREEN_1,
    marginTop: Mixin.moderateSize(4),
  },
  viewNamePrice: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  txtOrigin: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#b1e5d3',
    paddingTop: 3,
  },
  btnCart: {
    backgroundColor: Colors.GREEN_1,
    width: Mixin.moderateSize(48),
    height: Mixin.moderateSize(36),
    alignSelf: 'flex-end',
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Mixin.moderateSize(8),
  },
};
export default ItemProduct;

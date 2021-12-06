import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {AppImage, AppText} from '../../../components/atoms';
import {images} from '../../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../../styles';

const ItemAccount = props => {
  const {icon, title, onPress, point} = props;
  if (point) {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <AppImage
            source={images.logoHorizontal}
            imageStyle={{width: 120, height: 40}}
          />
        </View>
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{width: '80%', flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={icon} size={24} style={styles.ic} color={Colors.ORANGE} />
        <AppText style={styles.textTitle}>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
};
const styles = {
  container: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  ic: {
    marginRight: 10,
  },
  textTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.BLACK,
  },
  arrow: {
    width: '2.5%',
    aspectRatio: 1.2 / 2,
  },
  txtPoint: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.ORANGE,
  },
};

export default ItemAccount;

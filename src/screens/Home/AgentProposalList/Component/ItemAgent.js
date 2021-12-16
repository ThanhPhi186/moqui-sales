import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {images} from '../../../../assets';
import {AppText} from '../../../../components/atoms';
import {Colors, Mixin} from '../../../../styles';

// interface ItemAgentProps {
//   item: Object;
//   containerStyle: Object
// }

const ItemAgent = props => {
  const {item} = props;
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <FastImage
        source={item.url ? {uri: item.url} : images.noImage}
        style={styles.img}
        resizeMode="contain"
      />
      <View style={styles.leftContent}>
        <AppText style={styles.officeSiteName}>{item.officeSiteName}</AppText>
        <AppText style={styles.txtContent}>{item.fullAddress}</AppText>
        {!!item.phone && (
          <AppText style={styles.txtContent}>{item.phone}</AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default ItemAgent;
const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    ...Mixin.padding(12, 12, 8, 12),
    borderBottomWidth: 2,
    borderColor: Colors.WHITE_SMOKE,
    alignItems: 'center',
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
};

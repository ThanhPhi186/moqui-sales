import React from 'react';
import {Linking, View} from 'react-native';
import {Colors, Mixin} from '../../styles';
import {AppText} from '../atoms';
import numeral from 'numeral';

// interface ItemCustomerProps {
//   title: string;
//   value: string
// }
const ItemInfo = props => {
  const {title, value, phone, price} = props;
  return (
    <View style={styles.container}>
      <AppText style={styles.title} containerStyle={styles.viewTitle}>
        {title} :
      </AppText>

      {phone ? (
        <AppText
          onPress={() => {
            Linking.openURL(`tel:${phone}`);
          }}
          style={styles.value}
          containerStyle={styles.viewValue}>
          {phone}
        </AppText>
      ) : (
        <AppText style={styles.value} containerStyle={styles.viewValue}>
          {price ? `${numeral(value).format()} đ` : value}
        </AppText>
      )}
    </View>
  );
};
export default ItemInfo;
const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: Mixin.moderateSize(8),
    borderColor: Colors.LIGHT_GREY,
  },
  viewTitle: {
    flex: 1,
  },
  viewValue: {
    flex: 1.5,
  },
  title: {
    fontWeight: 'bold',
  },
  value: {
    fontStyle: 'italic',
    textAlign: 'right',
  },
};

import React from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppText} from '../../../components/atoms';
import {Colors} from '../../../styles';

const ItemHomeMenu = props => {
  const {iconName, title} = props;
  return (
    <TouchableOpacity {...props} style={styles.btn}>
      <MaterialCommunityIcons
        color={Colors.PRIMARY}
        name={iconName}
        size={32}
      />
      <AppText style={styles.title}>{title}</AppText>
    </TouchableOpacity>
  );
};

export default ItemHomeMenu;

const styles = {
  btn: {
    alignItems: 'center',
    width: '33%',
    marginTop: 16,
  },
  title: {
    textAlign: 'center',
    marginTop: 8,
  },
};

import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';

import {images} from '../../assets';
import {Colors, Mixin} from '../../styles';
import {FONT_SIZE_14} from '../../styles/Typography';
import {AppImage} from '../atoms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppInput = props => {
  const {type} = props;

  const [secure, setSecure] = useState(true);
  if (type === 'password') {
    return (
      <View style={styles.viewInput}>
        <TextInput
          {...props}
          style={styles.txtInput}
          secureTextEntry={secure}
          placeholderTextColor={Colors.PLACE_HOLDER}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Icon
            name={'eye-outline'}
            size={24}
            style={styles.ic}
            color={Colors.GRAY}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.viewInput}>
      <TextInput
        {...props}
        style={styles.txtInput}
        placeholderTextColor={Colors.PLACE_HOLDER}
      />
    </View>
  );
};

const styles = {
  viewInput: {
    flexDirection: 'row',
    width: '100%',
    height: Mixin.moderateSize(40),
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtInput: {flex: 1, color: Colors.BLACK},
};
export default AppInput;

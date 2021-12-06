import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-gesture-handler';
import {AppText} from '../../../components/atoms';
import {Colors, Mixin} from '../../../styles';
import {FONT_SIZE_14} from '../../../styles/Typography';

const ComponentSearch = props => {
  const {title, type, zIndexContainer} = props;

  const [open, setOpen] = useState(false);

  const renderContent = () => {
    switch (type) {
      case 'dropdown':
        return (
          <DropDownPicker
            {...props}
            open={open}
            setOpen={setOpen}
            placeholderStyle={styles.placeholderStyle}
            style={styles.styleDropdown}
            containerStyle={styles.containerStyle}
            labelStyle={styles.labelStyle}
            zIndex={zIndexContainer}
          />
        );

      default:
        return (
          <TextInput
            {...props}
            style={styles.txtInput}
            placeholderTextColor={Colors.PLACE_HOLDER}
          />
        );
    }
  };
  return (
    <View
      style={[
        styles.container,
        Platform.OS !== 'android' && {zIndex: zIndexContainer},
      ]}>
      <AppText containerStyle={styles.title} style={styles.txtTitle}>
        {title}
      </AppText>
      {renderContent()}
    </View>
  );
};

export default ComponentSearch;

const styles = {
  container: {
    flexDirection: 'row',
    marginTop: 8,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
  },
  txtTitle: {
    fontWeight: 'bold',
  },
  txtInput: {
    borderWidth: 1,
    borderColor: 'gray',
    height: Mixin.moderateSize(40),
    borderRadius: Mixin.moderateSize(4),
    paddingHorizontal: 8,
    fontSize: FONT_SIZE_14,
    color: Colors.BLACK,
    flex: 3,
  },

  //dropdown
  containerStyle: {
    height: Mixin.moderateSize(40),
    borderRadius: Mixin.moderateSize(4),
    flex: 3,
  },
  labelStyle: {
    color: 'black',
    fontSize: 16,
  },

  styleDropdown: {
    borderRadius: Mixin.moderateSize(4),
    height: Mixin.moderateSize(40),
  },
  placeholderStyle: {
    color: 'transparent',
  },
};

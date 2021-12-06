import React, {useState} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {Colors, Mixin} from '../../styles';

import {FONT_SIZE_14} from '../../styles/Typography';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// interface FormInputProps {
//   title?: string;
//   isRequired?: Boolean;
//   type: string;
//   valueSelect: string;
//   onPress: () => void;
//   setValueDate: (date) => void;
// }

const FormInput = props => {
  const {
    title,
    isRequired,
    type,
    valueSelect,
    setValueDate,
    containerStyle,
    goToMap,
    location,
  } = props;
  const [modalDatePicker, setModalDatePicker] = useState(false);

  const renderContent = () => {
    switch (type) {
      case 'selectDate':
        return (
          <TouchableOpacity
            onPress={() => setModalDatePicker(true)}
            style={styles.btnSelect}>
            <AppText style={styles.txtSelect}>{valueSelect}</AppText>
            <FontAwesome
              name="calendar"
              color={Colors.BUTTON_HIGTH}
              size={20}
            />
          </TouchableOpacity>
        );
      case 'selectLocation':
        return (
          <TouchableOpacity onPress={goToMap} style={styles.viewInput}>
            <AppText
              numberOfLines={1}
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                fontSize: FONT_SIZE_14,
              }}>
              {location}
            </AppText>
            <View style={{alignSelf: 'center'}}>
              <Icon name="map-marker" color={Colors.PRIMARY} size={24} />
            </View>
          </TouchableOpacity>
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
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        <AppText style={styles.title}>{title}</AppText>
        {isRequired && <AppText style={styles.required}> (*)</AppText>}
      </View>
      {renderContent()}
      <DateTimePickerModal
        isVisible={modalDatePicker}
        mode="date"
        onConfirm={date => {
          setValueDate(date);
          setModalDatePicker(false);
        }}
        onCancel={() => setModalDatePicker(false)}
      />
    </View>
  );
};
export default FormInput;

const styles = {
  container: {
    marginTop: 8,
  },
  content: {
    flexDirection: 'row',
  },
  viewInput: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 8,
    height: Mixin.moderateSize(40),
    borderRadius: Mixin.moderateSize(4),
    paddingHorizontal: Mixin.moderateSize(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtInput: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 8,
    height: Mixin.moderateSize(40),
    borderRadius: Mixin.moderateSize(4),
    paddingHorizontal: 8,
    fontSize: FONT_SIZE_14,
    color: Colors.BLACK,
  },
  title: {
    fontSize: FONT_SIZE_14,
    color: Colors.PRIMARY,
    fontWeight: '600',
  },
  required: {
    fontSize: FONT_SIZE_14,
    color: Colors.RED,
  },
  btnSelect: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 8,
    height: Mixin.moderateSize(40),
    borderRadius: Mixin.moderateSize(4),
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  txtSelect: {
    fontSize: FONT_SIZE_14,
  },
};

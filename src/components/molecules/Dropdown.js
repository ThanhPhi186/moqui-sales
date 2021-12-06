import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {AppText} from '../atoms';
import {Colors, Mixin} from '../../styles';
import {FONT_SIZE_14} from '../../styles/Typography';

// interface AppDropDownProps extends DropDownPicker {
//   items: [{ label: string, value: string }];
//   value?: string;
//   onChangeItem?: (item: { label: string, value: string }) => {};
//   title?: string;
// }

// const defaultValue = [{label: 'Chọn giá trị', value: -1}];
const AppDropDown = props => {
  const {title} = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      {title && <AppText style={styles.txtTitle}>{title} :</AppText>}
      <DropDownPicker
        {...props}
        open={open}
        setOpen={setOpen}
        arrowSize={20}
        arrowColor="#90A1B5"
        placeholderStyle={styles.placeholderStyle}
        style={styles.styleDropdown}
        containerStyle={styles.containerStyle}
        labelStyle={styles.labelStyle}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropDownStyle}
        activeLabelStyle={styles.activeLabelStyle}
        activeItemStyle={styles.activeItemStyle}
      />
    </>
  );
};

export default AppDropDown;

const styles = {
  containerStyle: {
    alignSelf: 'center',
    // height: Mixin.moderateSize(40),
    borderRadius: Mixin.moderateSize(4),
    width: '100%',
  },
  labelStyle: {
    color: 'black',
    fontSize: 16,
  },
  activeLabelStyle: {
    color: Colors.PRIMARY,
    fontSize: 16,
  },
  itemStyle: {
    justifyContent: 'flex-start',
    backgroundColor: Colors.WHITE,
  },
  dropDownStyle: {
    backgroundColor: Colors.WHITE,
  },
  styleDropdown: {
    borderRadius: Mixin.moderateSize(4),
    height: Mixin.moderateSize(40),

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 1,
  },
  placeholderStyle: {
    color: 'transparent',
  },
  activeItemStyle: {
    // backgroundColor: color.primary,
  },
  txtTitle: {
    fontWeight: '600',
    paddingVertical: Mixin.moderateSize(4),
    fontSize: FONT_SIZE_14,
    marginTop: Mixin.moderateSize(12),
    color: Colors.PRIMARY,
  },
};

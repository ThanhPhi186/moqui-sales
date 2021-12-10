import React from 'react';
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
  // const [value, setValue] = useState(props.value || '');
  // const [data, setData] = useState();
  // const onChangeItems = item => {
  //   // setValue(item.value);
  //   props.onChangeItem(item);
  // };

  // useEffect(() => {
  //   setData([...props.items]);
  // }, [props.items]);

  // useEffect(() => {
  //   setValue(props.value);
  // }, [props.value]);

  return (
    <>
      {props.title && (
        <AppText style={styles.txtTitle}>{props.title} :</AppText>
      )}
      <DropDownPicker
        {...props}
        // searchable
        arrowSize={20}
        arrowColor="#90A1B5"
        placeholderStyle={styles.placeholderStyle}
        // items={data}
        // defaultValue={value}
        style={styles.styleDropdown}
        containerStyle={styles.containerStyle}
        labelStyle={styles.labelStyle}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropDownStyle}
        // onChangeItem={onChangeItems}
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
    height: Mixin.moderateSize(40),
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
    borderTopLeftRadius: Mixin.moderateSize(4),
    borderTopRightRadius: Mixin.moderateSize(4),
    borderBottomLeftRadius: Mixin.moderateSize(4),
    borderBottomRightRadius: Mixin.moderateSize(4),
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
    color: Colors.GRAY,
  },
  activeItemStyle: {
    // backgroundColor: color.primary,
  },
  txtTitle: {
    paddingVertical: Mixin.moderateSize(4),
    fontSize: FONT_SIZE_14,
    marginTop: Mixin.moderateSize(16),
    marginBottom: 4,
    // color: Colors.PRIMARY,
  },
};

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {Appbar, TextInput as Input} from 'react-native-paper';

import styles from './styles';

import moment from 'moment';

import {useDispatch, useSelector} from 'react-redux';

import SimpleToast from 'react-native-simple-toast';
import Geocoder from 'react-native-geocoding';

import Geolocation from 'react-native-geolocation-service';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Const, trans} from '../../../utils';
import {ServiceHandle} from '../../../services';
import hasLocationPermission from '../../../helpers/LocationHelper';
import {AuthenOverallRedux} from '../../../redux';
import {FormInput} from '../../../components/atoms';
import {AppDialog, Dropdown} from '../../../components/molecules';
import {ScrollView} from 'react-native-gesture-handler';
import {NAVIGATION_NAME} from '../../../navigations';
import Toast from 'react-native-toast-message';

Geocoder.init(Const.GOOGLE_MAP_API);

const AddCustomer = ({navigation}) => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);

  const [avatar, setAvatar] = useState('');
  const [dateOfBirth, setDateOfBird] = useState(moment().format('DD/MM/YYYY'));
  const [startDate, setStartDate] = useState(moment().format('DD/MM/YYYY'));
  const [gender, setGender] = useState('M');
  const [customerName, setCustomerName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [modalError, setModalError] = useState(false);
  const [address, setAddress] = useState();
  const [addressWard, setAddressWard] = useState();

  const [addressDetail, setAddressDetail] = useState([]);

  const location = useSelector(state => state.AuthenOverallReducer.location);

  const productStoreId = useSelector(
    state => state.StoreReducer.store.productStoreId,
  );

  const [listRoute, setListRoute] = useState([]);

  const [rule, setRule] = useState('');
  const [note, setNote] = useState('');
  const [listGender, setListGender] = useState([
    {label: trans('Male'), value: 'M'},
    {label: trans('Female'), value: 'F'},
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    ServiceHandle.get(Const.API.GetAllRoute).then(res => {
      if (res.ok) {
        const convertRule = res.data.routes.map(elm => {
          return {
            label: `[${elm.routeId}] ${elm.routeName}`,
            value: elm.routeId,
          };
        });
        setListRoute(convertRule);
        setRule(convertRule[0].value);
      }
    });
  }, [BaseUrl]);

  useEffect(() => {
    if (location) {
      Geocoder.from(location?.latitude, location?.longitude)
        .then(res => {
          console.log('ressss', res);
          setAddress(res.results[0]);
          setAddressDetail(
            res.results[0].address_components.filter(
              elm => elm.types.length > 1,
            ),
          );

          const addressWard = res.results[0].address_components
            .filter(elm => elm.types.length === 1)
            .map(elm => elm.long_name);

          setAddressWard(
            res.results[0].address_components.filter(
              elm => elm.types.length === 1,
            ),
          );
        })
        .catch(error => SimpleToast.show(error, SimpleToast.SHORT));
    }
  }, [location]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    const locationPermission = await hasLocationPermission();
    if (!locationPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      position => {
        dispatch(AuthenOverallRedux.Actions.getLocation(position.coords));
      },
      error => {
        console.log('error', error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  };

  // const options = {
  //   title: 'Select Avatar',
  //   storageOptions: {
  //     skipBackup: true,
  //     path: 'images',
  //   },
  // };

  // const openImagePicker = () => {
  //   ImagePicker.showImagePicker(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       const source = {uri: response.uri};
  //       // You can also display the image using data:
  //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  //       setAvatar(source);
  //     }
  //   });
  // };

  const handelCheckValue = () => {
    if (!customerName) {
      setErrMessage(trans('storeOwnerNameNotEmpty'));
      return true;
    }
    if (!storeName) {
      setErrMessage(trans('storeNameNotEmpty'));
      return true;
    }
    if (!phoneNumber) {
      setErrMessage(trans('phoneNumberNotEmpty'));
      return true;
    }
    if (phoneNumber.length < 9) {
      setErrMessage(trans('phoneNumberNotCorrect'));
      return true;
    }
    if (!address) {
      setErrMessage(trans('addressNotEmpty'));
      return true;
    }
    return false;
  };

  console.log(
    'location.latitude',
    location.latitude.toString().replace('.', ','),
  );

  const createCustomer = () => {
    if (handelCheckValue()) {
      setModalError(true);
      return;
    }
    // partyCode;
    // fullName;
    // productStoreId;
    // gender;
    // note;
    // officeSiteName;
    // salesmanId;
    // routeId;
    // countryGeoId;
    // stateProvinceGeoId;
    // districtId;
    // wardId;
    // tarAddress;
    // telecomNumber;
    // emailAddress;
    // latitude;
    // longitude;

    const params = {
      fullName: customerName, //done
      gender, //done
      officeSiteName: storeName, //done
      telecomNumber: phoneNumber, //done
      tarAddress: addressWard[0].long_name + ' ' + addressWard[1].long_name, //done
      latitude: location.latitude, //done
      longitude: location.longitude, //done
      routeId: rule, //done
      // birthDay: new Date(moment(dateOfBirth, 'DD/MM/YYYY').unix() * 1000),
      // startDate: new Date(moment(startDate, 'DD/MM/YYYY').unix() * 1000),
      note,
      productStoreId: productStoreId, //done
      // wardName: 'Khương Trung', //done
      districtName: addressDetail[0].long_name, //done
      stateProvinceGeoName: addressDetail[1].long_name, // done
      // countryGeoName: addressDetail[2].long_name, //done
      countryGeoName: 'Việt Nam',
    };
    console.log('params', params);
    ServiceHandle.post(Const.API.CreateCustomerAgent, params).then(res => {
      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: 'Thêm mới khach hàng thành công 👋',
          visibilityTime: 2000,
        });
        navigation.goBack();
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      nestedScrollEnabled={true}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('addCustomer')} />
        <Appbar.Action icon="telegram" onPress={createCustomer} />
      </Appbar.Header>
      <View style={styles.content}>
        {/* <View
          style={[
            {flexDirection: 'row'},
            Platform.OS === 'ios' && {zIndex: 1},
          ]}> */}
        {/* <View style={{flex: 1, alignItems: 'center', paddingRight: 12}}>
            <FastImage
              source={avatar ? avatar : images.noImage}
              style={{width: '100%', height: 100}}
              resizeMode="stretch"
            />
            <Button
              mode="contained"
              onPress={() => openImagePicker()}
              color={Colors.PRIMARY}
              labelStyle={{fontWeight: 'bold', fontSize: FONT_SIZE_12}}
              style={styles.btnUpLoad}>
              {trans('upload')}
            </Button>
          </View> */}
        {/* <View style={{flex: 1.5}}> */}
        <FormInput
          title={trans('storeOwnerName')}
          isRequired
          placeholder={trans('storeOwnerName')}
          value={customerName}
          onChangeText={setCustomerName}
        />
        <Dropdown
          title={trans('gender')}
          items={listGender}
          value={gender}
          setValue={setGender}
          setItems={setListGender}
          listMode="SCROLLVIEW"
        />
        <FormInput
          title={trans('dateOfBirth')}
          type="selectDate"
          valueSelect={dateOfBirth}
          setValueDate={date =>
            setDateOfBird(moment(date).format('DD/MM/YYYY'))
          }
        />
        <FormInput
          title={trans('phoneNumber')}
          isRequired
          placeholder={trans('inputPhoneNumber')}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
        />
        {/* </View> */}
        {/* </View> */}
        <FormInput
          title={trans('storeName')}
          isRequired
          placeholder={trans('inputStoreName')}
          value={storeName}
          onChangeText={setStoreName}
        />
        <FormInput
          goToMap={() =>
            navigation.navigate(NAVIGATION_NAME.MapScreen, {
              address: address?.formatted_address,
            })
          }
          title={trans('address')}
          isRequired
          type="selectLocation"
          location={address?.formatted_address}
        />
        <FormInput
          title={trans('startDate')}
          type="selectDate"
          valueSelect={startDate}
          setValueDate={date => setStartDate(moment(date).format('DD/MM/YYYY'))}
        />

        <Dropdown
          title={trans('route')}
          items={listRoute}
          setItems={setListRoute}
          value={rule}
          setValue={setRule}
          listMode="SCROLLVIEW"
        />

        <FormInput
          title={trans('otherInfo')}
          placeholder={trans('inputOtherInfo')}
        />
      </View>
      <AppDialog
        content={errMessage}
        isVisible={modalError}
        onPressClose={() => setModalError(false)}
        value={note}
        onChangeText={setNote}
      />
    </KeyboardAwareScrollView>
  );
};

// Exports
export default AddCustomer;

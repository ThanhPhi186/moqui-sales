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
import {NAVIGATION_NAME} from '../../../navigations';
import Toast from 'react-native-toast-message';

Geocoder.init(Const.GOOGLE_MAP_API);

const AddCustomer = ({navigation}) => {
  const BaseUrl = useSelector(state => state.AuthenOverallReducer.domain);

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
          setAddress(res.results[0]);
          setAddressDetail(
            res.results[0].address_components.filter(
              elm => elm.types.length > 1,
            ),
          );
          setAddressWard(
            res.results[0].address_components
              .filter(elm => elm.types.length === 1)
              .map(elm => elm.long_name)
              .join(' '),
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

  const createCustomer = () => {
    if (handelCheckValue()) {
      setModalError(true);
      return;
    }

    const params = {
      fullName: customerName, //done
      gender, //done
      officeSiteName: storeName, //done
      telecomNumber: phoneNumber, //done
      tarAddress: addressWard,
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

    ServiceHandle.post(Const.API.CreateCustomerAgent, params).then(res => {
      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: 'Thêm mới khach hàng thành công 👋',
          visibilityTime: 2000,
        });
        navigation.goBack();
      } else {
        console.log('params', params);
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

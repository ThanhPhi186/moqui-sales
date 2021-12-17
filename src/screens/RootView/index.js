import React, {useEffect} from 'react';
import {View} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import hasLocationPermission from '../../helpers/LocationHelper';
import {Colors} from '../../styles';
import Geolocation from 'react-native-geolocation-service';
import {useDispatch} from 'react-redux';
import {AuthenOverallRedux} from '../../redux';

const RootView = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentLocation = async () => {
      const locationPermission = await hasLocationPermission();
      if (!locationPermission) {
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          console.log('positionmmm', position);
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
    getCurrentLocation();
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={{flex: 1, backgroundColor: Colors.PRIMARY}}>
        {props.children}
      </SafeAreaView> */}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.LOGO_BACKGROUND_COLOR,
        }}>
        {props.children}
      </View>
    </SafeAreaProvider>
  );
};

export default RootView;

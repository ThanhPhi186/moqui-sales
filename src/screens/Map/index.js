import React, {useState} from 'react';
import {Dimensions, Modal, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geocoder from 'react-native-geocoding';
import SimpleToast from 'react-native-simple-toast';
import {Const, trans} from '../../utils';
import {AuthenOverallRedux} from '../../redux';
import {AppText} from '../../components/atoms';
import {Colors} from '../../styles';

navigator.geolocation = require('react-native-geolocation-service');

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;

const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const location = useSelector(state => state.AuthenOverallReducer.location);

  const addressProps = route.params.address;
  const [region, setRegion] = useState({
    latitude: location ? location.latitude : 16.3686343,
    longitude: location ? location.longitude : 105.8018584,
    latitudeDelta: location ? LATITUDE_DELTA : 15,
    longitudeDelta: location ? LONGITUDE_DELTA : 15 * ASPECT_RATIO,
  });
  const [coords, setCoords] = useState({
    latitude: location?.latitude,
    longitude: location?.longitude,
  });
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState(addressProps);

  // const homePlace = {
  //   description: 'Home',
  //   geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
  // };
  // const workPlace = {
  //   description: 'Work',
  //   geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
  // };

  const getAddress = coordinate => {
    Geocoder.from(coordinate?.latitude, coordinate?.longitude)
      .then(res => {
        setAddress(res.results[0].formatted_address);
        console.log(
          'AAAAAAAA',
          // res.results[0].formatted_address.split(',').slice(-3),
          res.results[0],
        );
      })
      .catch(error => SimpleToast.show(error, SimpleToast.SHORT));
  };
  console.log('AAAAA', coords);
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('choosePlace')} />
        <Appbar.Action
          icon="telegram"
          onPress={() => {
            dispatch(AuthenOverallRedux.Actions.getLocation(coords));
            navigation.goBack();
          }}
        />
      </Appbar.Header>
      <View style={{flex: 1, zIndex: 1}}>
        <TouchableOpacity
          style={styles.marker}
          onPress={() => setVisible(true)}>
          <AppText containerStyle={{flex: 1, marginLeft: 8}}>
            {address ?? trans('selectOneAddress')}
          </AppText>
          <Icon name="map-marker" color={Colors.PRIMARY} size={24} />
        </TouchableOpacity>
        <MapView
          provider={PROVIDER_GOOGLE}
          // initialRegion={region}
          region={region}
          style={styles.map}
          onPress={res => {
            setRegion({
              latitude: res.nativeEvent.coordinate.latitude,
              longitude: res.nativeEvent.coordinate.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            });
            setCoords(res.nativeEvent.coordinate);
            getAddress(res.nativeEvent.coordinate);
          }}>
          {coords.latitude && (
            <Marker
              coordinate={coords}
              title={'Your Location'}
              key={Math.random()}
            />
          )}
        </MapView>
      </View>

      <Modal visible={visible}>
        <View style={{flex: 1, backgroundColor: Colors.WHITE_SMOKE}}>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => setVisible(false)} />
            <Appbar.Content title={trans('choosePlace')} />
          </Appbar.Header>
          <GooglePlacesAutocomplete
            placeholder={trans('enterAddress')}
            minLength={2}
            onPress={(data, details = null) => {
              setAddress(data.description);
              setCoords({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
              setVisible(false);
              setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              });
            }}
            query={{
              key: Const.GOOGLE_MAP_API,
              language: 'en',
            }}
            // currentLocation={true}
            // predefinedPlaces={[homePlace, workPlace]}
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            nearbyPlacesAPI="GooglePlacesSearch"
            styles={styles.autocomplete}
            GooglePlacesDetailsQuery={{
              fields: 'geometry',
            }}
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
          />
        </View>
      </Modal>
    </View>
  );
};

export default MapScreen;

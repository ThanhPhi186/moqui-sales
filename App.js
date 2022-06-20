import React, {useEffect, useRef, useState} from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/config/store/configureStore';
import MainNavigator from './src/navigations/MainNavigator';
import {Colors} from './src/styles';
import Toast from 'react-native-toast-message';
import BootSplash from 'react-native-bootsplash';
import {Animated, StyleSheet, Alert, Linking, Platform} from 'react-native';
import {device_height} from './src/styles/Mixin';
import {images} from './src/assets';
import {RootView} from './src/screens';
import 'react-native-gesture-handler';
import VersionCheck from 'react-native-version-check';
import SimpleToast from 'react-native-simple-toast';
// import VersionCheck from 'react-native-version-check';

const {persistor, store} = configureStore();
// persistor.purge();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.PRIMARY,
    text: Colors.BLACK,
  },
};

const App = () => {
  const [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
  const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState(false);
  const opacity = useRef(new Animated.Value(1));
  const translateY = useRef(new Animated.Value(0));

  // const fakeApiCallWithoutBadNetwork = ms =>
  //   new Promise(resolve => setTimeout(resolve, ms));

  const init = async () => {
    // You can uncomment this line to add a delay on app startup
    // await fakeApiCallWithoutBadNetwork(400);

    await BootSplash.hide();

    Animated.stagger(300, [
      Animated.spring(translateY.current, {
        useNativeDriver: true,
        toValue: -50,
      }),
      Animated.spring(translateY.current, {
        useNativeDriver: true,
        toValue: device_height,
      }),
    ]).start();

    Animated.timing(opacity.current, {
      useNativeDriver: true,
      toValue: 0,
      duration: 200,
      delay: 400,
    }).start(() => {
      setBootSplashIsVisible(false);
    });
  };

  useEffect(() => {
    bootSplashLogoIsLoaded && init();
  }, [bootSplashLogoIsLoaded]);

  useEffect(() => {
    const checkUpdateVersion = async () => {
      try {
        // const currentVersion = await VersionCheck.getCurrentVersion({
        //   provider: Platform.OS === 'ios' ? 'appStore' : 'playStore',
        // });
        // const latestVersion = await VersionCheck.getLatestVersion({
        //   provider: Platform.OS === 'ios' ? 'appStore' : 'playStore',
        // });
        // console.log('currentVersion', currentVersion, latestVersion);
        VersionCheck.needUpdate({
          depth: 2,
          // currentVersion: currentVersion,
          // latestVersion: latestVersion,
        }).then(res => {
          if (res.isNeeded) {
            Alert.alert(
              'Thông báo',
              'Đã có bản nâng cấp trên kho ứng dụng. Vui lòng cài đặt phiên bản mới nhất để sử dụng!',
              [{text: 'OK', onPress: openAppStore}],
            );
          }
        });
      } catch (error) {
        SimpleToast.show(error, SimpleToast.SHORT);
      }
    };
    checkUpdateVersion();
  }, []);

  const openAppStore = () => {
    let link = '';

    if (Platform.OS === 'ios') {
      link = 'https://apps.apple.com/vn/app/mont-e-sales/id1600641850';
    } else {
      link = 'https://play.google.com/store/apps/details?id=com.montesales';
    }

    Linking.canOpenURL(link).then(
      supported => {
        supported && Linking.openURL(link);
      },
      err => console.log(err),
    );
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate persistor={persistor}>
          <RootView>
            {bootSplashIsVisible ? (
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  styles.bootsplash,
                  {opacity: opacity.current},
                ]}>
                <Animated.Image
                  source={images.logoWhite}
                  fadeDuration={0}
                  onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
                  style={[
                    styles.logo,
                    {transform: [{translateY: translateY.current}]},
                  ]}
                />
              </Animated.View>
            ) : (
              <MainNavigator />
            )}
            <Toast ref={ref => Toast.setRef(ref)} />
          </RootView>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};
export default App;

const styles = StyleSheet.create({
  bootsplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LOGO_BACKGROUND_COLOR,
  },
  logo: {
    height: 95,
    width: 160,
  },
});

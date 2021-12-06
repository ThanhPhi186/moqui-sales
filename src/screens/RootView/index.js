import React, {useEffect} from 'react';
import {View} from 'react-native';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../styles';

const RootView = props => {
  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     // navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       // setLoading(false);
  //     });
  // }, []);

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

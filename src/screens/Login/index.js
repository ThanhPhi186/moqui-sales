import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {trans} from '../../utils/i18n';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {AuthenOverallRedux} from '../../redux';
import AppText from '../../components/atoms/AppText';
import {AppLoading} from '../../components/atoms';
import {Colors} from '../../styles';

import {device_height, device_width} from '../../styles/Mixin';

import {TextInput} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';

import {Const} from '../../utils';
import {ServiceHandle} from '../../services';
import SimpleToast from 'react-native-simple-toast';
import {NAVIGATION_NAME} from '../../navigations';

const LoginScreen = ({navigation}) => {
  const accountUser = useSelector(
    state => state.AuthenOverallReducer.accountUser,
  );
  const [employeeCode, setEmployeeCode] = useState(accountUser.username);
  const [password, setPassword] = useState(accountUser.password);
  const [showPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(
    accountUser.password ? true : false,
  );

  const dispatch = useDispatch();

  const login = async () => {
    ServiceHandle.setHeader('');
    setLoading(true);
    const params = {
      username: employeeCode,
      password: password,
    };

    const responseLogin = await ServiceHandle.post(Const.API.Login, params);
    try {
      if (responseLogin.data) {
        const apiKey = responseLogin.data.apiKey;

        ServiceHandle.setHeader(apiKey);

        dispatch(AuthenOverallRedux.Actions.setCookies(apiKey));

        if (toggleCheckBox) {
          dispatch(
            AuthenOverallRedux.Actions.setAccount({
              username: employeeCode,
              password: password,
            }),
          );
        } else {
          dispatch(
            AuthenOverallRedux.Actions.setAccount({
              username: employeeCode,
              password: '',
            }),
          );
        }

        navigation.navigate(NAVIGATION_NAME.ChangeStore, {
          fromScreen: NAVIGATION_NAME.LoginScreen,
        });
      } else {
        setTimeout(() => {
          SimpleToast.show(responseLogin.error);
        }, 700);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1, backgroundColor: 'white', position: 'relative'}}>
        <AppLoading isVisible={loading} />
        <View
          style={{
            backgroundColor: Colors.PRIMARY,
            flex: 2,
            borderBottomEndRadius: 50,
            borderBottomStartRadius: 50,
          }}></View>
        <View style={{flex: 1}}></View>
        <View
          style={{
            backgroundColor: 'white',
            width: device_width * 0.9,
            height: device_height * 0.7,
            borderRadius: 20,
            position: 'absolute',
            alignSelf: 'center',
            top: (device_height * 0.3) / 2,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            padding: 20,
            justifyContent: 'center',
          }}>
          <AppText
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 24,
            }}>
            Đăng nhập
          </AppText>
          <TextInput
            label={trans('employeeCode')}
            value={employeeCode}
            onChangeText={setEmployeeCode}
            style={styles.containerInput}
            mode="outlined"
            autoCapitalize="none"
            // defaultValue={accountUser.username}
          />
          <TextInput
            label={trans('password')}
            value={password}
            onChangeText={setPassword}
            style={styles.containerInput}
            mode="outlined"
            autoCapitalize="none"
            secureTextEntry={showPass}
            // defaultValue={accountUser.password}
            right={
              <TextInput.Icon
                onPress={() => setShowPass(!showPass)}
                name={showPass ? 'eye' : 'eye-off'}
                color="gray"
              />
            }
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              tintColors={{true: Colors.PRIMARY, false: Colors.GRAY}}
            />
            <AppText style={{marginLeft: 8}}>Ghi nhớ mật khẩu</AppText>
          </View>

          <TouchableOpacity style={styles.btn} onPress={login}>
            <AppText style={styles.txtLogin}>
              {trans('login').toUpperCase()}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Exports
export default LoginScreen;

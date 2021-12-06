import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {AppDialog, Button} from '../../../components/molecules';
import {AuthenOverallRedux, StoreRedux} from '../../../redux';

import {ServiceHandle} from '../../../services';

import {Colors} from '../../../styles';
import {Const, trans} from '../../../utils';

import styles from './styles';

const ChangePassword = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [messErr, setMessErr] = useState();
  const [modalError, setModalError] = useState(false);

  const dispatch = useDispatch();

  const handelCheckValue = () => {
    if (!currentPassword || !newPassword || !passwordVerify) {
      setMessErr(trans('doNotEmptyPassword'));
      return true;
    }
    return false;
  };

  const changePass = () => {
    if (handelCheckValue()) {
      setModalError(true);
      return;
    }
    const params = {
      currentPassword,
      newPassword,
      passwordVerify,
    };
    ServiceHandle.post(Const.API.UpdatePassWordMobilemcs, params).then(res => {
      if (res.ok) {
        SimpleToast.show(trans('changePassSuccess'));
        setTimeout(() => {
          dispatch(AuthenOverallRedux.Actions.handleLogout());
          dispatch(StoreRedux.Actions.changeStore(''));
        }, 500);
      } else {
        setMessErr(res.error);
        setModalError(true);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />

        <Appbar.Content title={trans('changePass')} />
      </Appbar.Header>
      <View style={styles.content}>
        <TextInput
          label={trans('oldPass')}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          style={styles.containerInput}
          mode="outlined"
          autoCapitalize="none"
        />
        <TextInput
          label={trans('newPass')}
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.containerInput}
          mode="outlined"
          autoCapitalize="none"
        />
        <TextInput
          label={trans('confirmPass')}
          value={passwordVerify}
          onChangeText={setPasswordVerify}
          style={styles.containerInput}
          mode="outlined"
          autoCapitalize="none"
        />
        <Button
          containerStyle={styles.btn}
          titleColor={Colors.WHITE}
          title={trans('confirm').toUpperCase()}
          onPress={changePass}
        />
      </View>
      <AppDialog
        content={messErr}
        isVisible={modalError}
        onPressClose={() => setModalError(false)}
      />
    </View>
  );
};
export default ChangePassword;

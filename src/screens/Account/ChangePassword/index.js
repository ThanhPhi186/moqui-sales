import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {AppDialog, Button} from '../../../components/molecules';
import {AuthenOverallRedux, StoreRedux} from '../../../redux';
import {ServiceHandle} from '../../../services';
import {Colors} from '../../../styles';
import {Const, trans} from '../../../utils';
import styles from './styles';
import Toast from 'react-native-toast-message';

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
    if (newPassword !== passwordVerify) {
      setMessErr(trans('passwordNotMatch'));
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
      oldPassword: currentPassword,
      newPassword,
      newPasswordVerify: passwordVerify,
    };
    ServiceHandle.post(Const.API.UpdatePasswordMobile, params).then(res => {
      if (res.ok) {
        if (res.data.updateSuccessful === true) {
          Toast.show({
            type: 'success',
            text1: trans('changePassSuccess'),
            visibilityTime: 2000,
          });
        } else {
          setMessErr(res.data.messages);
          setModalError(true);
        }
        dispatch(AuthenOverallRedux.Actions.logout.request());
        dispatch(StoreRedux.Actions.changeStore(''));
        ServiceHandle.setHeader('');
      } else {
        setMessErr(
          'Cần nhập chính xác mật khẩu cũ và không được trùng với 5 lần gần nhất',
        );
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

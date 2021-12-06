import React, {useState} from 'react';
import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import {trans} from '../../utils/i18n';
import styles from './styles';
import {images} from '../../assets';
import {AppText} from '../../components/atoms';

import SimpleToast from 'react-native-simple-toast';
import {Const} from '../../utils';
import {useDispatch} from 'react-redux';
import AuthenOverallRedux from '../../redux/authen';
import {ServiceHandle} from '../../services';

const LoginCompanyScreen = () => {
  const dispatch = useDispatch();
  const [companyCode, setCompanyCode] = useState();

  const getCompany = () => {
    if (!companyCode) {
      return SimpleToast.show(trans('companyCodeNotEmpty'), SimpleToast.SHORT);
    }

    const params = {key: companyCode};

    ServiceHandle.get(Const.API.GetDomain, params).then(res => {
      if (res.data.domain) {
        const domain = `https://${res.data.domain}/mobilemcs/control`;
        ServiceHandle.setBaseUrl(domain);
        dispatch(AuthenOverallRedux.Actions.setDomain(domain));
      } else {
        SimpleToast.show(trans('companyCodeIncorrect'), SimpleToast.SHORT);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image source={images.logoWhite} style={styles.logo} />
      <TextInput
        style={styles.txtInput}
        value={companyCode}
        onChangeText={text => setCompanyCode(text)}
        placeholder={trans('enterCompanyCode')}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.btn}
        mode="text"
        color="white"
        onPress={getCompany}>
        <AppText style={styles.txtContinue}>
          {trans('continue').toUpperCase()}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default LoginCompanyScreen;

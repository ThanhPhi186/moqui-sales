import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppText} from '../../../components/atoms';
import {AuthenOverallRedux, StoreRedux} from '../../../redux';
import {
  HEIGHT_MIDDLE_HOME_BTN,
  NAVIGATION_BOTTOM_TABS_HEIGHT,
} from '../../../styles/GlobalStyles';
import {trans} from '../../../utils';
import {Colors, Mixin} from '../../../styles';
import {device_height, device_width} from '../../../styles/Mixin';
import ItemAccount from '../component/ItemAccount';
import BannerBehind from '../component/BannerBehind';
import {images} from '../../../assets';
import {AppDialog} from '../../../components/molecules';
import {NAVIGATION_NAME} from '../../../navigations';
import {ServiceHandle} from '../../../services';

const MainAccount = ({navigation}) => {
  const dispatch = useDispatch();

  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);
  const store = useSelector(state => state.StoreReducer.store);

  const [modalLogout, setModalLogout] = useState(false);
  const [modalChangeCompany, setModalChangeCompany] = useState(false);

  const logout = () => {
    dispatch(AuthenOverallRedux.Actions.logout.request());
    dispatch(StoreRedux.Actions.changeStore(''));
    ServiceHandle.setHeader('');
  };

  const changeCompany = () => {
    dispatch(AuthenOverallRedux.Actions.logout.request());
    dispatch(AuthenOverallRedux.Actions.resetCompany());
  };

  return (
    <View style={styles.container}>
      <BannerBehind backGround={images.ic_Background} avatar={images.avatar} />
      <View style={styles.viewInfo}>
        <AppText title style={styles.txtName}>
          Nguyễn Thành Phi
        </AppText>
        <AppText style={styles.txtInfo}>{store.storeName}</AppText>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.largeIndicate} />
        <ItemAccount point={userInfo} />
        <View style={styles.largeIndicate} />
        <ScrollView
          contentContainerStyle={{
            paddingBottom:
              NAVIGATION_BOTTOM_TABS_HEIGHT + HEIGHT_MIDDLE_HOME_BTN,
          }}>
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="gift-outline"
            title={trans('changeStore')}
            onPress={() =>
              navigation.navigate(NAVIGATION_NAME.ChangeStore, {
                fromScreen: NAVIGATION_NAME.MainAccount,
              })
            }
          />
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="key"
            title={trans('changePass')}
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="home-import-outline"
            title={trans('companyChange')}
            onPress={() => setModalChangeCompany(true)}
          />
          <View style={styles.smallIndicate} />
          <ItemAccount
            icon="logout"
            title="Đăng xuất"
            onPress={() => setModalLogout(true)}
          />
        </ScrollView>
      </View>
      <AppDialog
        content={trans('confirmChangeCompany')}
        isVisible={modalChangeCompany}
        onPressClose={() => setModalChangeCompany(false)}
        onPressConfirm={changeCompany}
      />
      <AppDialog
        content={trans('confirmLogout')}
        isVisible={modalLogout}
        onPressClose={() => setModalLogout(false)}
        onPressConfirm={logout}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    aspectRatio: 3.5 / 1,
  },
  avatArea: {
    // width: '100%',
    // aspectRatio: 2.5 / 1,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: device_height / 8,
    alignSelf: 'center',
  },
  image: {
    width: device_width / 3.2,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    top: device_height / 8,
    // marginTop: height/8,
  },
  areaButtonLogin: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderBottomWidth: 7,
    borderBottomColor: Colors.WHITE_SMOKE,
    alignItems: 'flex-end',
    paddingBottom: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  areaName: {
    width: '100%',
    height: 50,
    borderBottomWidth: 7,
    borderBottomColor: Colors.WHITE_SMOKE,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  buttonLogin: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: 40,
  },
  textButtonLogin: {
    fontSize: 17,
    color: Colors.PRIMARY,
  },
  buttonRegister: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.bgRegister,
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    height: 40,
  },
  textButtonRegister: {
    fontSize: 17,
    color: Colors.bgRegister,
  },
  largeIndicate: {
    width: '100%',
    height: 7,
    backgroundColor: Colors.WHITE_SMOKE,
  },
  smallIndicate: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.WHITE_SMOKE,
  },
  textName: {
    fontSize: 17,
    fontWeight: '500',
  },
  box: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    height: 50,
  },
  boxLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  titleRight: {
    fontSize: 17,

    fontWeight: '400',
  },
  picker: {
    height: 50,
    width: 145,
  },
  txtName: {
    fontWeight: 'bold',
  },
  viewInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Mixin.moderateSize(8),
    paddingBottom: Mixin.moderateSize(8),
  },
  txtInfo: {
    marginTop: Mixin.moderateSize(4),
  },
};

export default MainAccount;

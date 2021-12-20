import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';

import numeral from 'numeral';
import {useSelector} from 'react-redux';
import {
  container,
  HEIGHT_MIDDLE_HOME_BTN,
  NAVIGATION_BOTTOM_TABS_HEIGHT,
} from '../../styles/GlobalStyles';
import {Const, trans} from '../../utils';
import {AppText} from '../../components/atoms';
import {Colors} from '../../styles';
import {images} from '../../assets';
import SimpleToast from 'react-native-simple-toast';
import Clipboard from '@react-native-community/clipboard';

const ShareScreen = () => {
  const userInfo = useSelector(state => state.AuthenOverallReducer.userAuthen);

  const coppyText = () => {
    Clipboard.setString(
      'https://play.google.com/store/apps/details?id=com.mont_e',
    );
    SimpleToast.show('Sao chép mã giới thiệu thành công', SimpleToast.SHORT);
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={trans('share')}
        />
      </Appbar.Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: NAVIGATION_BOTTOM_TABS_HEIGHT + HEIGHT_MIDDLE_HOME_BTN,
        }}>
        <FastImage
          source={images.shareBG}
          style={{width: '100%', height: 200}}
          resizeMode="contain"
        />
        <View style={{paddingHorizontal: 16, marginTop: 16}}>
          <AppText title style={{marginTop: 16}}>
            Link chia sẻ :
          </AppText>

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
            <AppText
              numberOfLines={1}
              containerStyle={{
                height: 40,
                backgroundColor: Colors.GREEN_2,
                justifyContent: 'center',
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
                paddingLeft: 12,
                width: '60%',
                alignItems: 'center',
              }}
              style={{fontWeight: 'bold'}}>
              https://play.google.com/store/apps/details?id=com.mont_e
            </AppText>
            <TouchableOpacity
              onPress={coppyText}
              style={{
                height: 40,
                width: '30%',
                justifyContent: 'center',
                backgroundColor: Colors.ORANGE,
                alignItems: 'center',
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
              }}>
              <AppText style={{color: Colors.WHITE, fontWeight: 'bold'}}>
                {trans('copy')}
              </AppText>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 40,
              paddingBottom: 16,
            }}>
            <View
              style={{
                width: '42%',
                height: 100,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.WHITE,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Text style={{fontWeight: 'bold'}}>
                <Text style={{color: Colors.ORANGE}}>
                  {numeral(userInfo.affiliateCount || 0).format()}{' '}
                </Text>
                Người
              </Text>
              <AppText style={{marginTop: 16}}>số người giới thiệu</AppText>
            </View>
            <View
              style={{
                width: '42%',
                height: 100,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.WHITE,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Text style={{fontWeight: 'bold'}}>
                <Text style={{color: Colors.ORANGE}}>
                  {numeral(userInfo.point).format()}{' '}
                </Text>
                điểm
              </Text>
              <AppText style={{marginTop: 16}}>Số điểm tích luỹ</AppText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShareScreen;

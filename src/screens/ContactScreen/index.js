import React, {useState} from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {images} from '../../assets';
import {AppLoading, AppText} from '../../components/atoms';
import {Button} from '../../components/molecules';
import {post} from '../../services/ServiceHandle';
import {Colors} from '../../styles';
import {
  container,
  HEIGHT_MIDDLE_HOME_BTN,
  NAVIGATION_BOTTOM_TABS_HEIGHT,
} from '../../styles/GlobalStyles';
import {device_height} from '../../styles/Mixin';
import {Const, trans} from '../../utils';

const ContactScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handelCheckValue = () => {
    if (!name) {
      SimpleToast.show('Vui lòng nhập tên của bạn', SimpleToast.SHORT);
      return true;
    }
    if (!title) {
      SimpleToast.show('Vui lòng nhập chủ đề phản hồi', SimpleToast.SHORT);
      return true;
    }
    if (!content) {
      SimpleToast.show('Vui lòng nhập nội dung phản hồi', SimpleToast.SHORT);
      return true;
    }
    return false;
  };

  const sendFeedback = () => {
    if (handelCheckValue()) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setContent('');
      setName('');
      setTitle('');
      setTimeout(() => {
        return SimpleToast.show('Gửi phản hồi thành công', SimpleToast.SHORT);
      }, 700);
    }, 1000);
  };

  const openFacebook = () => {
    const pageID = 460699881054856;
    const scheme = Platform.select({
      ios: 'fb://profile/',
      android: 'fb://page/',
    });
    Linking.openURL(`${scheme}${pageID}`);
  };

  const callPhone = () => {
    Linking.openURL(`tel:0376871280`);
  };

  const openzalo = () => {
    Linking.openURL('https://zalo.me/0376871280');
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.Content
          style={{alignItems: 'center'}}
          color="white"
          title={trans('contactMontE')}
        />
      </Appbar.Header>
      <FastImage
        source={images.contactBG}
        style={{width: '100%', height: 200}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: NAVIGATION_BOTTOM_TABS_HEIGHT + HEIGHT_MIDDLE_HOME_BTN,
        }}>
        <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
          <AppText>Liên hệ</AppText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
            <TouchableOpacity onPress={callPhone}>
              <FastImage source={images.call} style={{width: 50, height: 50}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openFacebook}>
              <FastImage
                source={images.message}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openzalo}>
              <FastImage source={images.zalo} style={{width: 50, height: 50}} />
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <FastImage
                source={images.gmail}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity> */}

            <View style={{width: 50, height: 50}} />
          </View>
          <AppText style={{marginTop: 20}}>
            Phản hồi chất lượng Dịch vụ / Sản Phẩm
          </AppText>

          <View
            style={{
              height: 40,
              width: '100%',
              backgroundColor: Colors.GREEN_2,
              justifyContent: 'center',
              paddingLeft: 16,
              borderBottomWidth: 1,
              borderBottomColor: Colors.WHITE,
              marginTop: 16,
              borderTopRightRadius: 16,
              borderTopLeftRadius: 16,
            }}>
            <TextInput
              style={{fontStyle: 'italic'}}
              placeholderTextColor={Colors.BLACK}
              placeholder="Tên của bạn"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View
            style={{
              height: 40,
              width: '100%',
              backgroundColor: Colors.GREEN_2,
              justifyContent: 'center',
              paddingLeft: 16,
              borderBottomWidth: 1,
              borderBottomColor: Colors.WHITE,
            }}>
            <TextInput
              style={{fontStyle: 'italic'}}
              placeholderTextColor={Colors.BLACK}
              placeholder="Chủ đề phản hồi của bạn"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View
            style={{
              height: device_height / 4,
              backgroundColor: Colors.GREEN_2,
              padding: 16,
              borderBottomRightRadius: 16,
              borderBottomLeftRadius: 16,
            }}>
            <TextInput
              style={{
                flex: 1,
                fontStyle: 'italic',
                textAlignVertical: 'top',
              }}
              multiline
              placeholderTextColor={Colors.BLACK}
              placeholder="Nội dung phản hồi của bạn"
              value={content}
              onChangeText={setContent}
            />
          </View>
          <Button
            onPress={sendFeedback}
            title="Gửi phản hồi"
            titleStyle={{fontSize: 16}}
            containerStyle={{
              width: '40%',
              height: 40,
              backgroundColor: Colors.ORANGE,
              marginTop: 8,
              alignSelf: 'flex-end',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactScreen;

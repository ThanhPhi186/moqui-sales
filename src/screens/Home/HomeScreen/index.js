import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import {SliderBox} from 'react-native-image-slider-box';
import {useSelector} from 'react-redux';
import {images} from '../../../assets';
import {AppImage, AppText} from '../../../components/atoms';
import {isIphoneX} from '../../../helpers/iphoneXHelper';
import {NAVIGATION_NAME} from '../../../navigations';
import {Colors, Mixin} from '../../../styles';
import {
  container,
  HEIGHT_MIDDLE_HOME_BTN,
  NAVIGATION_BOTTOM_TABS_HEIGHT,
  rowSpaceBetween,
  titleBold,
  viewRow,
} from '../../../styles/GlobalStyles';
import {device_width, statusBar} from '../../../styles/Mixin';
import ItemHomeMenu from '../component/ItemHomeMenu';
import numeral from 'numeral';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconCart} from '../../../components/molecules';

const HomeScreen = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const componentItemTop = (title, icon, onPress) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.viewProduct}>
          <IconMaterialCommunityIcons
            name={icon}
            size={40}
            color={Colors.PRIMARY}
          />
        </View>
        <AppText style={styles.txtProduct}>{title}</AppText>
      </TouchableOpacity>
    );
  };

  const renderHeader = (
    <View style={styles.containerHeader}>
      <View style={rowSpaceBetween}>
        <View>
          <View style={viewRow}>
            <AppImage
              source={images.avatar}
              style={styles.avatar}
              resizeMode="contain"
            />
            <View>
              <AppText style={styles.txtHello}>Xin chào,</AppText>
              <AppText title style={styles.txtName}>
                Nguyễn Thành Phi
              </AppText>
              <AppText title style={styles.txtAffiliateCode}>
                CHT00102
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = (
    <View style={{flex: 1}}>
      <View style={styles.groupMenuTop}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: 1,
              paddingHorizontal: 20,
              borderColor: Colors.PRIMARY,
            }}>
            <AppImage
              source={images.logoTransparent}
              imageStyle={{
                width: 80,
                height: 40,
              }}
            />
            <AppText title style={{fontWeight: 'bold'}}>
              Mont-E
            </AppText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 12,
            }}>
            {componentItemTop(
              'Top Seller',
              'badge-account-horizontal-outline',
              () => navigation.navigate('TopSales'),
            )}
            {componentItemTop('Sản Phẩm', 'download-multiple', () =>
              navigation.navigate('TopSales'),
            )}
            {componentItemTop('Ưu Đãi', 'gift-outline', () =>
              navigation.navigate(NAVIGATION_NAME.PromotionScreen),
            )}
          </View>
        </View>
      </View>
      <View style={styles.containerItem}>
        <ItemHomeMenu
          iconName="cart"
          title={`Tạo đơn ${'\n'} hàng`}
          onPress={() => navigation.navigate(NAVIGATION_NAME.ChooseCustomer)}
        />

        <ItemHomeMenu
          iconName="shopping-search"
          title={`Tra cứu ${'\n'} sản phẩm`}
          onPress={() =>
            navigation.navigate(NAVIGATION_NAME.SearchProductScreen)
          }
        />

        <ItemHomeMenu
          iconName="currency-usd-circle"
          title={'Danh sách chính sách giá'}
          onPress={() => navigation.navigate(NAVIGATION_NAME.ListPricePolicy)}
        />
        <ItemHomeMenu
          iconName="file-edit"
          title={`Danh sách giá ${'\n'} thay đổi`}
          onPress={() => navigation.navigate(NAVIGATION_NAME.ListPriceChange)}
        />
        <ItemHomeMenu
          iconName="file-remove"
          title={`Thống kê ${'\n'} huỷ hàng`}
          onPress={() =>
            navigation.navigate(NAVIGATION_NAME.CancelOrderStatistic)
          }
        />
        <ItemHomeMenu
          iconName="bag-personal"
          title="Kiểm kê"
          onPress={() =>
            navigation.navigate(NAVIGATION_NAME.ListInventoryPeriod)
          }
        />
        <ItemHomeMenu
          iconName="history"
          title={`Lịch sử ${'\n'} đăng nhập`}
          onPress={() =>
            navigation.navigate(NAVIGATION_NAME.CashierLoginHistory)
          }
        />
      </View>
    </View>
  );

  return (
    <View style={container}>
      <View style={styles.statusBarIos} />
      {renderHeader}
      {renderItem}
    </View>
  );
};

export default HomeScreen;

const styles = {
  statusBarIos: {
    height: isIphoneX() ? statusBar : 0,
    backgroundColor: Colors.PRIMARY,
  },
  headerContainer: {
    overflow: 'hidden',
    paddingBottom: 4,
  },
  headerContent: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: 'white',
  },
  avatar: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  logoCompany: {
    width: 80,
    height: 40,
  },
  itemImageSlider: {
    borderRadius: 16,
    width: device_width - 24,
    marginTop: 12,
  },
  containerItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 12,
    marginHorizontal: 12,
    borderRadius: 12,
  },
  viewRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  containerHeader: {
    backgroundColor: Colors.PRIMARY,
    height: Mixin.moderateSize(120),
    borderBottomLeftRadius: Mixin.moderateSize(40),
    borderBottomRightRadius: Mixin.moderateSize(40),
    paddingHorizontal: 20,

    justifyContent: 'center',
  },
  txtHello: {
    color: Colors.WHITE,
  },
  txtAffiliateCode: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  txtName: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    // marginBottom: 4,
  },
  viewProduct: {
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CEDC8F',
  },
  txtProduct: {
    textAlign: 'center',
    marginTop: 8,
  },
  groupMenuTop: {
    backgroundColor: '#FFF',
    marginHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Mixin.moderateSize(-20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};
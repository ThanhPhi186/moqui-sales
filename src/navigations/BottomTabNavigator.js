import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  HomeScreen,
  ChangePassword,
  MainAccount,
  ChangeStore,
  SearchProductScreen,
  ListPriceChange,
  SelectProduct,
  ConfirmOrder,
  ContactScreen,
  ShareScreen,
  ChooseCustomer,
  PromotionScreen,
  LookUpProduct,
  ListSaleOrderScreen,
  OrderDetailScreen,
  AgentList,
  AgentDetail,
  AddCustomer,
  MapScreen,
  RecentDate,
  Inventory,
  ShopReport,
  SalesmanReport,
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomButtonTab} from '../components/molecules';
import {trans} from '../utils';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../styles';
import {FONT_SIZE_10} from '../styles/Typography';
import {device_width} from '../styles/Mixin';
import TabShape from './TabShape';
import {NAVIGATION_BOTTOM_TABS_HEIGHT} from '../styles/GlobalStyles';
import {NAVIGATION_NAME} from '.';
import {Appbar} from 'react-native-paper';
import {PromotionDetail} from '../screens/Home';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';

    if (
      routeName === NAVIGATION_NAME.ChooseCustomer ||
      routeName === NAVIGATION_NAME.SearchProductScreen ||
      routeName === NAVIGATION_NAME.ListPriceChange ||
      routeName === NAVIGATION_NAME.SelectProduct ||
      routeName === NAVIGATION_NAME.ConfirmOrder ||
      routeName === NAVIGATION_NAME.PromotionScreen ||
      routeName === NAVIGATION_NAME.LookUpProduct ||
      routeName === NAVIGATION_NAME.ListSaleOrderScreen ||
      routeName === NAVIGATION_NAME.OrderDetailScreen ||
      routeName === NAVIGATION_NAME.AgentList ||
      routeName === NAVIGATION_NAME.AgentDetail ||
      routeName === NAVIGATION_NAME.AddCustomer ||
      routeName === NAVIGATION_NAME.MapScreen ||
      routeName === NAVIGATION_NAME.RecentDate ||
      routeName === NAVIGATION_NAME.Inventory ||
      routeName === NAVIGATION_NAME.ChangeStore ||
      routeName === NAVIGATION_NAME.PromotionDetail ||
      routeName === NAVIGATION_NAME.ShopReport ||
      routeName === NAVIGATION_NAME.SalesmanReport
    ) {
      return false;
    }
    return true;
  };

  const getPersonVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'MainAccount';

    if (
      routeName === NAVIGATION_NAME.ChangeStore ||
      routeName === NAVIGATION_NAME.ChangePassword
    ) {
      return false;
    }
    return true;
  };

  const getSalesProductVisibility = route => {
    const routeName =
      getFocusedRouteNameFromRoute(route) ?? 'ListProductInStore';
    if (routeName === 'SalesCart' || routeName === 'PaymentOfSales') {
      return false;
    }
    return true;
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName={NAVIGATION_NAME.HomeScreen}>
        <Stack.Screen
          name={NAVIGATION_NAME.HomeScreen}
          component={HomeScreen}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ChooseCustomer}
          component={ChooseCustomer}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.SearchProductScreen}
          component={SearchProductScreen}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ListPriceChange}
          component={ListPriceChange}
        />

        <Stack.Screen
          name={NAVIGATION_NAME.SelectProduct}
          component={SelectProduct}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ConfirmOrder}
          component={ConfirmOrder}
        />

        <Stack.Screen
          name={NAVIGATION_NAME.PromotionScreen}
          component={PromotionScreen}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.LookUpProduct}
          component={LookUpProduct}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ListSaleOrderScreen}
          component={ListSaleOrderScreen}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.OrderDetailScreen}
          component={OrderDetailScreen}
        />
        <Stack.Screen name={NAVIGATION_NAME.AgentList} component={AgentList} />
        <Stack.Screen
          name={NAVIGATION_NAME.AgentDetail}
          component={AgentDetail}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.AddCustomer}
          component={AddCustomer}
        />
        <Stack.Screen name={NAVIGATION_NAME.MapScreen} component={MapScreen} />
        <Stack.Screen
          name={NAVIGATION_NAME.RecentDate}
          component={RecentDate}
        />
        <Stack.Screen name={NAVIGATION_NAME.Inventory} component={Inventory} />
        <Stack.Screen
          name={NAVIGATION_NAME.ChangeStore}
          component={ChangeStore}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.PromotionDetail}
          component={PromotionDetail}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.SalesmanReport}
          component={SalesmanReport}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ShopReport}
          component={ShopReport}
        />
      </Stack.Navigator>
    );
  };

  const AccountStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animationEnabled: true,
        }}
        initialRouteName={NAVIGATION_NAME.MainAccount}>
        <Stack.Screen
          name={NAVIGATION_NAME.MainAccount}
          component={MainAccount}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ChangeStore}
          component={ChangeStore}
        />
        <Stack.Screen
          name={NAVIGATION_NAME.ChangePassword}
          component={ChangePassword}
        />
      </Stack.Navigator>
    );
  };

  function MyTabBar({state, descriptors, navigation}) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    const tabWidth = React.useMemo(
      () => device_width / state.routes.length,
      [state.routes.length],
    );

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
    const renderIcon = name => {
      switch (name) {
        case trans('home'):
          return 'home';
        case trans('contact'):
          return 'phone-in-talk';
        case 'L??n ????n':
          return 'plus-circle-outline';
        case trans('share'):
          return 'share-variant';
        case trans('personal'):
          return 'account';
        default:
          break;
      }
    };

    return (
      <View style={styles.content}>
        <TabShape {...{tabWidth}} />
        <View style={styles.subContent}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];

            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            if (index === 2) {
              return (
                <CustomButtonTab
                  onPress={() =>
                    navigation.navigate(NAVIGATION_NAME.ChooseCustomer)
                  }
                  key={index}
                />
              );
            }

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name={renderIcon(label)}
                  color={isFocused ? Colors.PRIMARY : Colors.GRAY}
                  size={24}
                />
                <Text
                  style={{
                    color: isFocused ? Colors.PRIMARY : Colors.GRAY,
                    marginTop: 4,
                    fontSize: FONT_SIZE_10,
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
  const middleComponent = () => {
    return null;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name={trans('home')}
        component={HomeStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen name={trans('contact')} component={ContactScreen} />
      <Tab.Screen
        name="L??n ????n"
        component={middleComponent}
        options={({route}) => ({
          tabBarVisible: getSalesProductVisibility(route),
        })}
      />
      <Tab.Screen
        name={trans('share')}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <View style={{padding: 6}}>
                <MaterialCommunityIcons name="bell" size={size} color={color} />
                <View
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 4,
                    width: 16,
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontSize: 12, color: 'white', fontWeight: '600'}}>
                    4
                  </Text>
                </View>
              </View>
            );
          },
        }}
        component={ShareScreen}
      />
      <Tab.Screen
        name={trans('personal')}
        component={AccountStack}
        options={({route}) => ({
          tabBarVisible: getPersonVisibility(route),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = {
  content: {
    position: 'absolute',
    bottom: 0,
  },
  subContent: {
    flexDirection: 'row',
    position: 'absolute',
    height: NAVIGATION_BOTTOM_TABS_HEIGHT,
    width: device_width,
  },
};

export default BottomTabNavigator;

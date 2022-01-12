import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {Appbar, FAB, Searchbar} from 'react-native-paper';

import styles from './styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {removeDiacritics} from '../../../helpers/mcsHelper';
import {Colors, Mixin} from '../../../styles';
import {Const, trans} from '../../../utils';
import {ServiceHandle} from '../../../services';
import SimpleToast from 'react-native-simple-toast';
import {ItemCustomer} from '../../../components/molecules';
import {NAVIGATION_NAME} from '../../../navigations';
import {AppLoading, AppText} from '../../../components/atoms';

const initialLayout = {width: Mixin.device_width};

const ChooseCustomer = ({navigation, route}) => {
  // const [searchQuery, setSearchQuery] = useState('');
  const store = useSelector(state => state.StoreReducer.store);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'inLine', title: trans('inLine')},
    {key: 'leftLine', title: trans('leftLine')},
  ]);

  const screens = route?.params?.screens;

  const theme = useTheme();

  const [listInLine, setListInLine] = useState([]);
  const [listLeftLine, setListLeftLine] = useState([]);
  const [dataInline, setDataInline] = useState();
  const [dataLeftLine, setDataLeftLine] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    setLoading(true);
    try {
      const params = {productStoreId: store.productStoreId};
      const response = await ServiceHandle.get(Const.API.GetCustomers, params);
      if (response.ok) {
        setDataInline(response.data.inRoute.customers);
        setListInLine(response.data.inRoute.customers);
        setDataLeftLine(response.data.outRoute.customers);
        setListLeftLine(response.data.outRoute.customers);
      } else {
        setTimeout(() => {
          SimpleToast.show(response.error, SimpleToast.SHORT);
        }, 700);
      }
    } catch (error) {
      setTimeout(() => {
        SimpleToast.show(error, SimpleToast.SHORT);
      }, 700);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    getCustomer();
  };

  const onChangeSearch = txt => {
    const searchInline = listInLine.filter(elm => {
      return (
        removeDiacritics(elm?.postalAddress).includes(removeDiacritics(txt)) ||
        removeDiacritics(elm?.officeSiteName).includes(removeDiacritics(txt))
        // ||
        // elm?.telecomNumber.includes(txt)
      );
    });
    const searchLeftLine = listLeftLine.filter(elm => {
      return (
        removeDiacritics(elm?.postalAddress).includes(removeDiacritics(txt)) ||
        removeDiacritics(elm?.officeSiteName).includes(removeDiacritics(txt))
        // ||
        // elm?.telecomNumber.includes(txt)
      );
    });
    setDataInline(searchInline);
    setDataLeftLine(searchLeftLine);
  };

  const goScreens = item => {
    switch (screens) {
      case 'RegisDisplayCumulative':
        navigation.navigate('RegisDisplayCumulative', {item});
        break;
      case 'ScoreDisplayCumulative':
        navigation.navigate('ScoreDisplayCumulative', {item});
        break;
      case NAVIGATION_NAME.ShopReport:
        navigation.navigate(NAVIGATION_NAME.ShopReport, {item});
        break;
      default:
        navigation.navigate(NAVIGATION_NAME.SelectProduct, {item});
    }
  };

  const renderEmptyComponent = () => {
    return <AppText style={styles.txtEmpty}>{trans('notCustomer')}</AppText>;
  };

  const InLine = () => {
    return (
      <FlatList
        data={dataInline}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, indexInline) => indexInline.toString()}
        extraData={dataInline}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        // refreshControl={
        //   <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        // }
      />
    );
  };
  const LeftLine = () => {
    return (
      <FlatList
        data={dataLeftLine}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, indexLeftLine) => indexLeftLine.toString()}
        extraData={dataLeftLine}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        // refreshControl={
        //   <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        // }
      />
    );
  };

  const renderScene = SceneMap({
    inLine: InLine,
    leftLine: LeftLine,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: theme.colors.background}}
      style={{backgroundColor: Colors.PRIMARY, shadowColor: theme.colors.text}}
      // labelStyle={{color: theme.colors.primary}}
      // pressColor="red"
    />
  );
  const renderItem = item => {
    return (
      <ItemCustomer
        item={item}
        onPress={() => goScreens(item)}
        type={'check-status'}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('chooseCustomer')} />
      </Appbar.Header>
      <View style={styles.containerSearch}>
        <Searchbar
          placeholder={trans('searchCustomer')}
          onChangeText={onChangeSearch}
          // value={searchQuery}
          style={{width: '90%', borderRadius: 12}}
          inputStyle={{fontStyle: 'italic'}}
        />
      </View>
      {!screens ? (
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
          style={{flex: 10}}
        />
      ) : (
        <View style={{flex: 10}}>{InLine()}</View>
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate(NAVIGATION_NAME.AddCustomer)}
      />
    </View>
  );
};
export default ChooseCustomer;

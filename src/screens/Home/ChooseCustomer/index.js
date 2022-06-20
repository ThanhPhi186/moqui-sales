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
  const [dataInline, setDataInline] = useState([]);
  const [dataLeftLine, setDataLeftLine] = useState([]);

  const [listTotal, setListTotal] = useState([]);
  const [dataTotal, setDataTotal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCustomer(setLoading);
  }, []);

  const getCustomer = async handleLoading => {
    handleLoading(true);
    try {
      const params = {productStoreId: store.productStoreId};
      const response = await ServiceHandle.get(Const.API.GetCustomers, params);
      if (response.ok) {
        const {data} = response;
        const responseInline = data.inRoute.customers;
        const responseLeftLine = data.outRoute.customers;

        setDataInline(responseInline);
        setListInLine(responseInline);
        setDataLeftLine(responseLeftLine);
        setListLeftLine(responseLeftLine);
        setDataTotal(responseInline.concat(responseLeftLine));
        setListTotal(responseInline.concat(responseLeftLine));
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
      handleLoading(false);
    }
  };

  const onRefresh = () => {
    getCustomer(setRefreshing);
  };

  const onChangeSearch = (text, data, setData) => {
    const searchData = data.filter(elm => {
      return (
        removeDiacritics(elm.postalAddress || '').includes(
          removeDiacritics(text),
        ) ||
        removeDiacritics(elm.officeSiteName || '').includes(
          removeDiacritics(text),
        ) ||
        removeDiacritics(elm.telecomNumber || '').includes(
          removeDiacritics(text),
        )
      );
    });
    setData(searchData);
  };

  const setTypeSearch = text => {
    if (screens) {
      onChangeSearch(text, listTotal, setDataTotal);
    } else {
      if (index === 0) {
        onChangeSearch(text, listInLine, setDataInline);
      } else {
        onChangeSearch(text, listLeftLine, setDataLeftLine);
      }
    }
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

  const renderFlatList = data => {
    return (
      <FlatList
        data={data}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, indexFlatList) => indexFlatList.toString()}
        extraData={data}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: theme.colors.background}}
      style={{backgroundColor: Colors.PRIMARY, shadowColor: theme.colors.text}}
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

  const renderScene = SceneMap({
    inLine: () => renderFlatList(dataInline),
    leftLine: () => renderFlatList(dataLeftLine),
  });

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
          onChangeText={setTypeSearch}
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
        <View style={{flex: 10}}>{renderFlatList(dataTotal)}</View>
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

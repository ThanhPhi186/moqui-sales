import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {Appbar, FAB, Searchbar} from 'react-native-paper';

import styles from './styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {removeDiacritics} from '../../../helpers/mcsHelper';
import {Colors, Mixin} from '../../../styles';
import {Const, trans} from '../../../utils';
import {ServiceHandle} from '../../../services';
import SimpleToast from 'react-native-simple-toast';
import {ItemCustomer} from '../../../components/molecules';

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

  const listCustomer = useState([]);
  const listLeftLine = useState([]);
  const loading = useState(false);
  const [dataInline, setDataInline] = useState();
  const [dataLeftLine, setDataLeftLine] = useState();

  console.log('store', store);

  // useEffect(() => {
  //   setDataInline(listCustomer);
  //   setDataLeftLine(listLeftLine);
  // }, [listCustomer, listLeftLine]);

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    const params = {productStoreId: store.productStoreId};
    const response = await ServiceHandle.get(Const.API.GetCustomers, params);
    if (response.ok) {
    } else {
      SimpleToast.show(response.error, SimpleToast.SHORT);
    }
  };

  const onRefresh = () => {
    getCustomer();
  };

  const onChangeSearch = txt => {
    const searchInline = listCustomer.filter(elm => {
      return (
        removeDiacritics(elm.address1).includes(removeDiacritics(txt)) ||
        removeDiacritics(elm.groupName).includes(removeDiacritics(txt)) ||
        elm.phoneNumber.contactNumber.includes(txt)
      );
    });
    const searchLeftLine = listLeftLine.filter(elm => {
      return (
        removeDiacritics(elm.address1).includes(removeDiacritics(txt)) ||
        removeDiacritics(elm.groupName).includes(removeDiacritics(txt)) ||
        elm.phoneNumber.contactNumber.includes(txt)
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
      case 'ShopStatistic':
        navigation.navigate('ShopStatistic', {item});
        break;
      default:
        navigation.navigate('CreateOrderScreen', {item});
    }
  };

  const InLine = () => {
    return (
      <FlatList
        data={dataInline}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, indexInline) => indexInline.toString()}
        extraData={dataInline}
        showsVerticalScrollIndicator={false}
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
        onPress={() => navigation.navigate('createCustomer')}
      />
    </View>
  );
};
export default ChooseCustomer;
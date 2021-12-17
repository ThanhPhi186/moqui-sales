import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {AppLoading, AppText} from '../../../../components/atoms';
import {NAVIGATION_NAME} from '../../../../navigations';
import {ServiceHandle} from '../../../../services';
import {Colors, Mixin} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import {FONT_SIZE_16} from '../../../../styles/Typography';

import {Const, trans} from '../../../../utils';

const ListInventoryPeriod = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const [loading, setLoading] = useState(false);

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Thống kê sales man" />
      </Appbar.Header>
      <AppLoading isVisible={loading} />
      <View style={styles.contentContainer}>
        <AppText style={styles.txtEmpty}>Tính năng đang phát triển</AppText>
      </View>
    </View>
  );
};

export default ListInventoryPeriod;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  contentFlatList: {
    paddingHorizontal: 12,
  },
  containerItem: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewHeaderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  txtEventId: {
    fontWeight: 'bold',
  },
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: Mixin.moderateSize(80),
  },
});

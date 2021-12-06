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

import {Const, trans} from '../../../../utils';

const ListInventoryPeriod = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = {
      productStoreId: store,
      viewIndex: 0,
      viewSize: 20,
    };
    ServiceHandle.post(Const.API.GetStockingEventsMobilemcs, params)
      .then(res => {
        if (res.ok) {
          setData(res.data.listEvents);
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      })
      .finally(() => setLoading(false));
  }, [store]);

  const renderStatus = status => {
    if (status === 'N') {
      return trans('notClosedYet');
    } else {
      return trans('closed');
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NAVIGATION_NAME.DetailInventoryPeriod, {
            eventDetail: item,
          })
        }
        style={styles.containerItem}>
        <View style={styles.viewHeaderItem}>
          <AppText style={styles.txtEventId}>
            {item.eventId} - {item.facilityId}
          </AppText>
          <AppText style={{color: Colors.PRIMARY}}>
            {renderStatus(item.isClosed)}
          </AppText>
        </View>
        <AppText>{item.fromDate}</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('listInventoryPeriod')} />
      </Appbar.Header>
      <AppLoading isVisible={loading} />
      <View style={styles.contentContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.contentFlatList}
        />
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
});

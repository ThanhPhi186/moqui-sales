import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {AppText} from '../../../../components/atoms';
import {Button, ItemInfo} from '../../../../components/molecules';
import {isIphoneX} from '../../../../helpers/iphoneXHelper';
import {ServiceHandle} from '../../../../services';
import {Colors} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import {NAVIGATION_NAME} from '../../../../navigations';
import {Const, trans} from '../../../../utils';

const DetailInventoryPeriod = ({navigation, route}) => {
  const {eventDetail} = route.params;

  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    const params = {
      eventId: eventDetail.eventId,
      viewIndex: 0,
      viewSize: 200,
    };
    ServiceHandle.post(Const.API.GetStockingEventItemsMobilemcs, params).then(
      res => {
        if (res.ok) {
          setDataProduct(res.data.listEventItems);
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      },
    );
  }, [eventDetail]);

  const renderStatus = status => {
    if (status === 'N') {
      return trans('notClosedYet');
    } else {
      return trans('closed');
    }
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <AppText>{item.productName}</AppText>
        <AppText style={{marginTop: 4}}>Kiểm đếm : {item.quantity}</AppText>
        <AppText style={{marginTop: 4}}>
          Kiểm chéo : {item.quantityRecheck}
        </AppText>
      </View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('detailInventoryPeriod')} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <ItemInfo
            title={trans('inventoryPeriodId')}
            value={eventDetail.eventId}
          />
          <ItemInfo title={trans('createdTime')} value={eventDetail.fromDate} />
          <ItemInfo title={trans('endDate')} value={eventDetail.thruDate} />
          <ItemInfo title={trans('storeCode')} value={eventDetail.facilityId} />
          <ItemInfo
            title={trans('status')}
            value={renderStatus(eventDetail.isClosed)}
          />
        </View>
        <AppText style={{marginTop: 12, fontWeight: 'bold'}}>Sản phẩm:</AppText>
        <View style={styles.content}>
          <FlatList
            data={dataProduct}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.contentFlatList}
          />
        </View>
        <View style={styles.viewGroupBtn}>
          <Button
            containerStyle={styles.btnCancel}
            title={trans('tally')}
            onPress={() =>
              navigation.navigate(NAVIGATION_NAME.ListLocation, {
                eventId: eventDetail.eventId,
              })
            }
            titleColor={Colors.PRIMARY}
          />
          <Button
            containerStyle={styles.btnOrdered}
            title={trans('crossCheck')}
            onPress={() => navigation.navigate(NAVIGATION_NAME.ListLocation)}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailInventoryPeriod;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: isIphoneX() ? 26 : 12,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 12,
    marginTop: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  viewGroupBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  btnCancel: {
    width: '45%',
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  btnOrdered: {
    width: '45%',
  },
});

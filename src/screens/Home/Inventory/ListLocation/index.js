import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {AppText} from '../../../../components/atoms';
import {NAVIGATION_NAME} from '../../../../navigations';

import {post} from '../../../../services/ServiceHandle';
import {Colors, Mixin} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import {LINE_HEIGHT} from '../../../../styles/Typography';

import {Const, trans} from '../../../../utils';

const ListLocation = ({navigation, route}) => {
  const {eventId} = route.params;

  const [listLocation, setListLocation] = useState([]);

  useEffect(() => {
    const getListLocation = () => {
      const params = {
        eventId,
        roleTypeId: 'STOCKING_SCAN',
      };
      post(Const.API.GetLocationsMobilemcs, params).then(res => {
        if (res.ok) {
          setListLocation(res.data.listLocations);
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      });
    };
    getListLocation();
  }, [eventId]);

  const renderStatus = status => {
    switch (status) {
      case 'STOCKING_CREATED':
        return 'Đã tạo';
      case 'STOCKING_GUARANTEED':
        return 'Đã kiểm chéo';
      case 'STOCKING_COMPLETED':
        return 'Đã hoàn thành';
      case 'STOCKING_UPLOADED':
        return 'Đã tải lên';
      default:
        break;
    }
  };

  const renderItem = item => {
    return (
      <TouchableOpacity style={styles.containerItem}>
        <AppText style={styles.locationCode}>{item.locationCode}</AppText>
        <AppText style={styles.statusCode}>
          {renderStatus(item.statusId)}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('listLocation')} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <FlatList
          data={listLocation}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.containerFlatlist}
        />
      </View>
    </View>
  );
};

export default ListLocation;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  containerItem: {
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: Mixin.moderateSize(12),
    marginTop: Mixin.moderateSize(16),
    borderRadius: Mixin.moderateSize(8),
  },
  locationCode: {
    fontWeight: 'bold',
    lineHeight: LINE_HEIGHT,
  },
  statusCode: {
    fontStyle: 'italic',
    lineHeight: LINE_HEIGHT,
  },
  containerFlatlist: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
});

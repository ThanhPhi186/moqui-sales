import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppText} from '../../../../components/atoms';
import {Colors, Mixin} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import {trans} from '../../../../utils';

const ListApplicableStore = ({navigation, route}) => {
  const {data, type} = route.params;

  const renderItem = item => {
    switch (type) {
      case 'store':
        return (
          <View style={styles.containerItem}>
            <AppText style={styles.nameProduct}>{item.productStoreId}</AppText>
            <AppText style={styles.txtInfo}>{item.storeName}</AppText>
          </View>
        );
      case 'status':
        return (
          <View style={styles.containerItem}>
            <AppText style={styles.nameProduct}>{item.statusId}</AppText>
            <AppText style={styles.txtInfo}>
              {item.statusDatetime} - {item.statusUserLogin}
            </AppText>
          </View>
        );

      default:
        break;
    }
  };

  const renderTitleHeader = () => {
    switch (type) {
      case 'store':
        return trans('applicableStore');
      case 'group':
        return trans('applicableStore');
      case 'status':
        return trans('statusEditHistory');
      default:
        break;
    }
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={renderTitleHeader()} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <FlatList
          data={data}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </View>
    </View>
  );
};

export default ListApplicableStore;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  containerItem: {
    backgroundColor: Colors.WHITE,
    ...Mixin.margin(12, 12, 0, 12),
    ...Mixin.padding(12),
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
  nameProduct: {
    fontWeight: 'bold',
  },
  txtInfo: {
    fontStyle: 'italic',
    paddingTop: Mixin.moderateSize(8),
  },
});

import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {AppLoading, AppText} from '../../../../components/atoms';
import {NAVIGATION_NAME} from '../../../../navigations';
import {ServiceHandle} from '../../../../services';
import {Colors, Mixin} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import {Const, trans} from '../../../../utils';

const ListPricePolicy = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const [listPricePolicy, setListPricePolicy] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = {
      productStoreId: store.productStoreId,
      viewIndex: 0,
      viewSize: 0,
    };
    ServiceHandle.post(Const.API.GetListQuotationsMobilemcs, params)
      .then(res => {
        if (res.ok) {
          setListPricePolicy(res.data.listQuotations);
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      })
      .finally(() => setLoading(false));
  }, [store.productStoreId]);

  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NAVIGATION_NAME.DetailPricePolicy, {
            productQuotationId: item.productQuotationId,
          })
        }
        style={styles.containerItem}>
        <AppText style={styles.nameProduct}>
          {item.quotationName} ( {item.productQuotationId} )
        </AppText>
        <AppText style={styles.txtInfo}>{item.fromDate}</AppText>
        <AppText style={styles.txtInfo}>{item.statusId}</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('listPricePolicy')} />
      </Appbar.Header>
      <FlatList
        data={listPricePolicy}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

export default ListPricePolicy;

const styles = {
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
};

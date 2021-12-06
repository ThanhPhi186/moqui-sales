import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {AppText} from '../../../components/atoms';
import {ItemInfo, SearchProductComponent} from '../../../components/molecules';
import {ServiceHandle} from '../../../services';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import styles from './styles';

const SearchProductScreen = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);
  const [dataProduct, setDataProduct] = useState();
  const [txtSearch, setTxtSearch] = useState('');
  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    const params = {
      productStoreId: store.productStoreId,
      searchString: txtSearch,
      viewIndex: 0,
      viewSize: 0,
    };

    const searchProduct = () => {
      ServiceHandle.post(Const.API.FindProductMobilemcs, params).then(res => {
        if (res.ok) {
          setDataSearch(res.data.listProducts);
        } else {
          setDataSearch([]);
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      });
    };
    txtSearch && searchProduct();
  }, [txtSearch, store.productStoreId]);

  const getInfoProduct = (productId, salesUomId) => {
    const params = {
      productStoreId: store.productStoreId,
      productId,
      salesUomId,
    };
    ServiceHandle.post(Const.API.GetProductInfoMobilemcs, params).then(res => {
      if (res.ok) {
        setDataProduct(res.data);
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('searchProduct')} />
      </Appbar.Header>
      <SearchProductComponent
        data={dataSearch}
        onChangeText={txt => setTxtSearch(txt)}
        selectProduct={item => getInfoProduct(item.productId, item.salesUomId)}
      />
      <View style={styles.contentContainer}>
        {dataProduct ? (
          <View style={styles.content}>
            <View style={styles.viewProductName}>
              <AppText
                style={styles.productName}
                containerStyle={styles.viewTitle}>
                {dataProduct.productName}
              </AppText>
            </View>
            <ItemInfo
              title={trans('shortenedName')}
              value={dataProduct.internalName}
            />
            <ItemInfo
              title={trans('productCode')}
              value={dataProduct.productCode}
            />
            <ItemInfo
              title={trans('productPrice')}
              value={dataProduct.listPriceTax}
              price
            />
            <ItemInfo
              title={trans('listedPrice')}
              value={dataProduct.priceTax}
              price
            />
            <ItemInfo
              title={trans('costPrice')}
              value={dataProduct.unitCost}
              price
            />
            <ItemInfo
              title={trans('upc')}
              value={dataProduct.goodIdentificationId}
            />
            <ItemInfo
              title={trans('inventory')}
              value={dataProduct.productTypeId}
            />
            <ItemInfo
              title={trans('taxApplicable')}
              value={`${dataProduct.taxPercentage} %`}
            />
          </View>
        ) : (
          <View style={styles.viewInfo}>
            <AppText style={styles.info}>{trans('noProduct')}</AppText>
          </View>
        )}
      </View>
    </View>
  );
};
export default SearchProductScreen;

import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {AppLoading, AppText} from '../../../components/atoms';
import {ItemInfo, SearchProductComponent} from '../../../components/molecules';
import {ServiceHandle} from '../../../services';
import {Const, trans} from '../../../utils';
import styles from './styles';

const LookUpProduct = ({navigation}) => {
  const [dataProduct, setDataProduct] = useState();
  const [loading, setLoading] = useState(false);

  const [listProduct, setListProduct] = useState([]);
  const productStoreId = useSelector(
    state => state.StoreReducer.store.productStoreId,
  );

  const searchProduct = txt => {
    const params = {
      documentType: 'MantleProduct',
      queryString: txt,
    };
    ServiceHandle.get(Const.API.QuickSearch, params).then(res => {
      if (res.ok) {
        setListProduct(res.data.documentList);
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const getDetailProduct = item => {
    setLoading(true);
    const params = {
      productId: item.productId,
      productStoreId,
    };
    ServiceHandle.get(Const.API.GetProductDetail, params)
      .then(res => {
        if (res.ok) {
          setDataProduct({...res.data.data.product, ...res.data.data.priceOut});
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('lookUpProduct')} />
      </Appbar.Header>

      <SearchProductComponent
        data={listProduct}
        selectProduct={getDetailProduct}
        onChangeText={searchProduct}
      />

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
            title={trans('nameList')}
            value={dataProduct.categoryName}
          />
          <ItemInfo
            title={trans('productCode')}
            value={dataProduct.productId}
          />
          <ItemInfo title={trans('defaultPrice')} value={dataProduct.price} />
          <ItemInfo
            title={trans('listedPrice')}
            value={dataProduct.productListPriceValue}
          />
          <ItemInfo title={trans('unit')} value={dataProduct.quantityUomDesc} />
          <ItemInfo title={trans('taxApplicable')} value="" />
          <ItemInfo
            title={trans('productType')}
            value={dataProduct.productCategoryId}
          />
        </View>
      ) : (
        <View style={styles.viewInfo}>
          <AppText style={styles.info}>{trans('detailInfoProduct')}</AppText>
        </View>
      )}
    </View>
  );
};
export default LookUpProduct;

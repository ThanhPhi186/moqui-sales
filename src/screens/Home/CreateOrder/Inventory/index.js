import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector} from 'react-redux';
import {
  AppDialog,
  Button,
  CardItem,
  ItemCustomer,
  SearchProductComponent,
} from '../../../../components/molecules';
import {ServiceHandle} from '../../../../services';
import {Mixin} from '../../../../styles';
import {Const, trans} from '../../../../utils';
import styles from './styles';
import Toast from 'react-native-toast-message';
import {cloneDeep, difference, differenceBy} from 'lodash';

const Inventory = ({navigation, route}) => {
  const [listChooseProduct, setListChooseProduct] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [contentDialog, setContentDialog] = useState('');
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [errMess, setErrMess] = useState('');
  const [modalErr, setModalErr] = useState(false);
  const [listProductBase, setListProductBase] = useState([]);
  const [loading, setLoading] = useState(false);
  const customer = route.params.item;

  const animationIsRunning = useRef(false);
  const rowTranslateAnimatedValues = {};
  listChooseProduct.map(elm => {
    rowTranslateAnimatedValues[elm.productId] = new Animated.Value(1);
  });

  const store = useSelector(state => state.StoreReducer.store);

  useEffect(() => {
    const getInventory = () => {
      setLoading(true);
      const params = {partyId: customer.partyId};
      ServiceHandle.get(Const.API.GetInventoryCusInfo, params)
        .then(res => {
          if (res.ok) {
            setListChooseProduct(res.data.inventoryCustInfo);
            const cloneData = cloneDeep(res.data.inventoryCustInfo);
            setListProductBase(cloneData);
          } else {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }
        })
        .finally(() => setLoading(false));
    };
    getInventory();
  }, [customer.partyId]);

  const searchProduct = txt => {
    const params = {
      documentType: 'MantleProduct',
      queryString: txt,
      productStoreId: store.productStoreId,
    };
    ServiceHandle.get(Const.API.SearchProduct, params).then(res => {
      if (res.ok) {
        setListProduct(res.data.products);
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  };

  const checkForUpdate = () => {
    if (
      differenceBy(listChooseProduct, listProductBase, 'qtyInInventory')
        .length > 0
    ) {
      return true;
    }
    return false;
  };

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    if (value < -Mixin.device_width && !animationIsRunning.current) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        // const newData = [...listChooseProduct].filter(
        //   item => item.productId !== key,
        // );
        // setListChooseProduct(newData);
        const newData = [...listChooseProduct].map(elm => {
          if (elm.productId === key) {
            elm.qtyInInventory = 0;
          }
          return elm;
        });
        setListChooseProduct(newData);
        animationIsRunning.current = false;
      });
    }
  };

  const chooseProduct = item => {
    if (
      !listChooseProduct
        .map(elm => {
          return elm.productId;
        })
        .includes(item.productId)
    ) {
      const newList = [...listChooseProduct];
      newList.push({...item, ...{qtyInInventory: 1}});
      setListChooseProduct(newList);
    }
  };

  const openModalDelete = () => {
    setVisibleDialog(true);
    if (listChooseProduct.length > 0) {
      setContentDialog(trans('confirmDeleteOrder'));
    } else {
      setContentDialog(trans('emptyCart'));
    }
  };

  const deleteProduct = () => {
    setListChooseProduct([]);
    setVisibleDialog(false);
  };

  const goConfirmInventory = () => {
    const inventory = differenceBy(
      listChooseProduct,
      listProductBase,
      'qtyInInventory',
    );
    const params = {
      customerId: customer.partyId,
      inventories: inventory,
    };

    ServiceHandle.post(Const.API.UpdateInventoryCus, params)
      .then(res => {
        if (res.data.message === 'UpdateSuccess') {
          Toast.show({
            type: 'success',
            text1: trans('updateInventorySuccess'),
            visibilityTime: 2000,
          });
          navigation.goBack();
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      })
      .finally(() => setVisibleDialog(false));
  };

  const openModalInventory = () => {
    setContentDialog(trans('confirmInventory'));
    setVisibleDialog(true);
  };

  const addQuantity = item => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.productId === item?.productId) {
        elm.qtyInInventory += 1;
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  const lessQuantity = item => {
    if (item.qtyInInventory > 0) {
      const newData = [...listChooseProduct].map(elm => {
        if (elm?.productId === item?.productId) {
          elm.qtyInInventory -= 1;
        }
        return elm;
      });
      setListChooseProduct(newData);
    }
  };

  const renderItem = item => {
    return (
      <Animated.View
        style={[
          styles.rowFrontContainer,
          {
            height: rowTranslateAnimatedValues[item.productId].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 80],
            }),
          },
        ]}>
        <CardItem
          item={item}
          type="choose"
          addQuantityProps={addQuantity}
          lessQuantityProps={lessQuantity}
          onPress={() => addQuantity(item)}
        />
      </Animated.View>
    );
  };

  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('commodityInventory')} />
        {/* <Appbar.Action icon="trash-can-outline" onPress={openModalDelete} /> */}
        {/* <Appbar.Action icon="telegram" onPress={openModalInventory} /> */}
      </Appbar.Header>

      <SearchProductComponent
        data={listProduct}
        selectProduct={chooseProduct}
        onChangeText={searchProduct}
      />

      <ItemCustomer
        item={customer}
        containerStyle={styles.viewStore}
        disabled
      />

      <SwipeListView
        disableRightSwipe
        data={listChooseProduct.filter(elm => elm.qtyInInventory > 0)}
        renderItem={({item}) => renderItem(item)}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Mixin.device_width}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        keyExtractor={(item, index) => item.productId}
      />
      {checkForUpdate() && (
        <Button
          containerStyle={styles.btnConfirm}
          title={trans('updateInventory')}
          onPress={openModalInventory}
        />
      )}

      <AppDialog
        content={contentDialog}
        isVisible={visibleDialog}
        onPressClose={() => setVisibleDialog(false)}
        titleConfirm="OK"
        onPressConfirm={goConfirmInventory}
      />
      <AppDialog
        content={errMess}
        isVisible={modalErr}
        onPressClose={() => setModalErr(false)}
      />
    </View>
  );
};

export default Inventory;

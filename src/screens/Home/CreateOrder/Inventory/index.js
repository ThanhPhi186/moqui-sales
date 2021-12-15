import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useSelector} from 'react-redux';
import {
  AppDialog,
  CardItem,
  ItemCustomer,
  SearchProductComponent,
} from '../../../../components/molecules';
import {ServiceHandle} from '../../../../services';
import {Mixin} from '../../../../styles';
import {Const, trans} from '../../../../utils';

import styles from './styles';

const Inventory = ({navigation, route}) => {
  const [listChooseProduct, setListChooseProduct] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [contentDialog, setContentDialog] = useState('');
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [errMess, setErrMess] = useState('');
  const [modalErr, setModalErr] = useState(false);
  const customer = route.params.item;

  const animationIsRunning = useRef(false);
  const rowTranslateAnimatedValues = {};
  listChooseProduct.map(elm => {
    rowTranslateAnimatedValues[elm.distinctId] = new Animated.Value(1);
  });
  // const listCustomer = useSelector(
  //   (state) => state.CustomerReducer.listCustomer,
  // );
  console.log('listproduct', listChooseProduct);

  useEffect(() => {
    const getInventory = () => {
      const params = {party_id: customer.partyId};
      ServiceHandle.post(Const.API.GetInventoryCusInfo, params).then(res => {
        if (res.ok) {
          setListChooseProduct(res.data.inventoryCusInfo);
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      });
    };
    getInventory();
  }, [customer.partyId]);

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    if (value < -Mixin.device_width && !animationIsRunning.current) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        const newData = [...listChooseProduct].filter(
          item => item.distinctId !== key,
        );
        setListChooseProduct(newData);
        animationIsRunning.current = false;
      });
    }
  };

  const chooseProduct = item => {
    if (
      !listChooseProduct
        .map(elm => {
          return elm.distinctId;
        })
        .includes(item.distinctId)
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
    const inventory = listChooseProduct.map(elm => {
      return {
        productId: elm.productId,
        productName: elm.productName,
        qtyInInventory: elm.qtyInInventory,
        quantityUomId: elm.quantityUomId,
      };
    });
    const params = {
      partyId: customer.partyIdTo,
      inventory: inventory,
    };
    ServiceHandle.post(Const.API.UpdateInventoryCus, params).then(res => {
      if (res.data.retMsg === 'update_success') {
        setVisibleDialog(false);
        setTimeout(() => {
          SimpleToast.show(trans('updateInventorySuccess'), SimpleToast.SHORT);
          navigation.popToTop();
        }, 500);
      } else {
        setVisibleDialog(false);
        setTimeout(() => {
          setErrMess(res.data.retMsg);
          setModalErr(true);
        }, 500);
      }
    });
  };

  const openModalInventory = () => {
    setContentDialog(trans('confirmInventory'));
    setVisibleDialog(true);
  };

  const addQuantity = item => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.distinctId === item?.distinctId) {
        elm.qtyInInventory += 1;
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  const lessQuantity = item => {
    if (item.qtyInInventory > 0) {
      const newData = [...listChooseProduct].map(elm => {
        if (elm?.distinctId === item?.distinctId) {
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
            height: rowTranslateAnimatedValues[item.distinctId].interpolate({
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
        <Appbar.Action icon="telegram" onPress={openModalInventory} />
      </Appbar.Header>

      <SearchProductComponent
        data={listProductSelector}
        selectProduct={chooseProduct}
      />

      <ItemCustomer
        item={customer}
        containerStyle={styles.viewStore}
        disabled
      />

      <SwipeListView
        disableRightSwipe
        data={listChooseProduct}
        renderItem={({item}) => renderItem(item)}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Mixin.device_width}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        keyExtractor={(item, index) => item.distinctId}
      />

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

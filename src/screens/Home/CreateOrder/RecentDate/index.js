import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {ServiceHandle} from '../../../../services';
import {Const, trans} from '../../../../utils';
import {Mixin} from '../../../../styles';
import {
  AppDialog,
  CardItem,
  ItemCustomer,
  SearchProductComponent,
} from '../../../../components/molecules';
import {AppLoading} from '../../../../components/atoms';
import {AuthenOverallRedux} from '../../../../redux';
import Toast from 'react-native-toast-message';

const RecentDate = ({navigation, route}) => {
  const [listChooseProduct, setListChooseProduct] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [contentDialog, setContentDialog] = useState('');
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [errMess, setErrMess] = useState('');
  const [modalErr, setModalErr] = useState(false);
  const [modalDatePicker, setModalDatePicker] = useState(false);
  const [itemClick, setItemClick] = useState();
  const [modalLogout, setModalLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useSelector(state => state.StoreReducer.store);

  const customer = route.params.item;

  const dispatch = useDispatch();

  const animationIsRunning = useRef(false);
  const rowTranslateAnimatedValues = {};
  listChooseProduct?.map(elm => {
    rowTranslateAnimatedValues[elm.productId] = new Animated.Value(1);
  });

  console.log('listChooseProduct', listChooseProduct, itemClick);

  useEffect(() => {
    setLoading(true);
    const getListExpRecent = () => {
      const params = {customerId: customer.partyId, pageIndex: 0, pageSize: 50};
      ServiceHandle.get(Const.API.GetListProductExpRecent, params)
        .then(res => {
          if (res.ok) {
            setListChooseProduct(res.data.listProductExpRecent);
          } else {
            setTimeout(() => {
              SimpleToast.show(res.error, SimpleToast.SHORT);
            }, 700);
          }
        })
        .finally(() => setLoading(false));
    };
    getListExpRecent();
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

  const goConfirmRecentDate = () => {
    const listRecentDate = listChooseProduct.map(elm => {
      return {
        productId: elm.productId,
        expiredDate: elm.expiredDate,
        qtyExpInventory: elm.qtyExpInventory,
      };
    });
    const params = {
      customerId: customer.partyId,
      listProdExp: listRecentDate,
    };

    ServiceHandle.post(Const.API.UpdateQtyProductExpInvent, params)
      .then(res => {
        if (res.ok) {
          Toast.show({
            type: 'success',
            text1: trans('updateRecentDateDone'),
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

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    if (value < -Mixin.device_width && !animationIsRunning.current) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
      }).start(() => {
        const newData = [...listChooseProduct].filter(
          item => item.productId !== key,
        );
        setListChooseProduct(newData);
        animationIsRunning.current = false;
      });
    }
  };

  // useEffect(() => {
  //   const convert = listChooseProduct?.map(elm => {
  //     return elm.productId;
  //   });
  //   console.log('convertttt', convert);
  // }, [listChooseProduct]);

  const chooseProduct = date => {
    setModalDatePicker(false);
    console.log('listProduct', listProduct, itemClick);
    if (
      !listChooseProduct
        .map(elm => {
          return elm.productId;
        })
        .includes(itemClick.productId)
    ) {
      console.log('aaaaa');
      const newList = [...listChooseProduct];
      newList.push({
        productName: itemClick.productName,
        productId: itemClick.productId,
        expiredDate: moment(date).unix() * 1000,
        qtyExpInventory: 1,
      });
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

  const addQuantity = item => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.productId === item?.productId) {
        elm.qtyExpInventory += 1;
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  const lessQuantity = item => {
    if (item.qtyExpInventory > 1) {
      const newData = [...listChooseProduct].map(elm => {
        if (elm?.productId === item?.productId) {
          elm.qtyExpInventory -= 1;
        }
        return elm;
      });
      setListChooseProduct(newData);
    }
  };

  const changeQuantity = (valueInput, item) => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.productId === item?.productId) {
        elm.qtyExpInventory = Number(valueInput);
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  const openModalRecentDate = () => {
    setContentDialog(trans('confirmInformation'));
    setVisibleDialog(true);
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
          chooseExpDate={() => setModalDatePicker(true)}
          onPress={() => addQuantity(item)}
          changeQuantityProps={changeQuantity}
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
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('commodityNearDate')} />
        {/* <Appbar.Action icon="trash-can-outline" onPress={openModalDelete} /> */}
        <Appbar.Action icon="telegram" onPress={openModalRecentDate} />
      </Appbar.Header>

      <SearchProductComponent
        data={listProduct}
        selectProduct={item => {
          setModalDatePicker(true);
          setItemClick(item);
        }}
        onChangeText={searchProduct}
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
        keyExtractor={(item, index) => item.productId}
      />

      <AppDialog
        content={contentDialog}
        isVisible={visibleDialog}
        onPressClose={() => setVisibleDialog(false)}
        titleConfirm="OK"
        onPressConfirm={goConfirmRecentDate}
      />
      <AppDialog
        content={errMess}
        isVisible={modalErr}
        onPressClose={() => setModalErr(false)}
      />
      <DateTimePickerModal
        isVisible={modalDatePicker}
        mode="date"
        onConfirm={date => chooseProduct(date)}
        onCancel={() => setModalDatePicker(false)}
      />
    </View>
  );
};

export default RecentDate;

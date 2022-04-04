import React, {useEffect, useRef, useState} from 'react';
import {Animated, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import Geolocation from 'react-native-geolocation-service';
import {Const, trans} from '../../../../utils';
import {Mixin} from '../../../../styles';
import {ServiceHandle} from '../../../../services';
import {
  AppDialog,
  CardItem,
  ItemCustomer,
  SearchProductComponent,
} from '../../../../components/molecules';
import {AppLoading} from '../../../../components/atoms';
import hasLocationPermission from '../../../../helpers/LocationHelper';
import {NAVIGATION_NAME} from '../../../../navigations';
import Toast from 'react-native-toast-message';
import {isEmpty} from 'lodash';

const SelectProduct = ({navigation, route}) => {
  const [listChooseProduct, setListChooseProduct] = useState([]);
  const [contentDialog, setContentDialog] = useState('');
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [errMess, setErrMess] = useState('');
  const [modalErr, setModalErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [listProduct, setListProduct] = useState([]);
  const [lastOrderId, setLastOrderId] = useState(null);
  const customer = route.params.item;

  const dispatch = useDispatch();

  // const listProductSelector = useSelector(
  //   state => state.ProductReducer.listChooseProduct,
  // );
  const store = useSelector(state => state.StoreReducer.store);
  // const location = useSelector(state => state.AuthenOverallReducer.location);

  const animationIsRunning = useRef(false);
  const rowTranslateAnimatedValues = {};
  listChooseProduct.map(elm => {
    rowTranslateAnimatedValues[elm.productId] = new Animated.Value(1);
  });
  // const listCustomer = useSelector(state => state.CustomerReducer.listCustomer);

  console.log('listchoose', listChooseProduct);

  useEffect(() => {
    const params = {
      customerId: customer.partyId,
    };
    ServiceHandle.get(Const.API.GetLastOrderBeingChanged, params).then(res => {
      if (res.ok) {
        if (!isEmpty(res.data)) {
          const convertData = res.data.orderDetail.orderItems.map(elm => {
            return {
              productName: elm.itemDescription,
              productId: elm.productId,
              priceOut: {price: elm.unitAmount},
              quantity: elm.quantity,
              orderItemSeqId: elm.orderItemSeqId,
            };
          });
          setLastOrderId(res.data.orderDetail.orderId);
          setListChooseProduct(convertData);
        } else {
        }
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
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

  const chooseProduct = item => {
    if (
      !listChooseProduct
        .map(elm => {
          return elm.productId;
        })
        .includes(item.productId)
    ) {
      const newList = [...listChooseProduct];
      newList.push({
        ...item,
        ...{quantity: 1, orderItemSeqId: newList.length + 1},
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

  const goConfirmOrder = () => {
    const convertList = listChooseProduct.filter(elm => {
      return elm.quantity > 0;
    });

    const products = convertList?.map(elm => {
      return {
        productName: elm.productName,
        productId: elm.productId,
        orderItemSeqId: elm.orderItemSeqId,
        quantity: elm.quantity,
        unitAmount: elm.priceOut.price,
      };
    });

    if (convertList.length > 0) {
      setLoading(true);
      const params = lastOrderId
        ? {
            productStoreId: store.productStoreId,
            orderId: lastOrderId,
            orderItems: products,
          }
        : {
            productStoreId: store.productStoreId,
            customerPartyId: customer.partyId,
            orderItems: products,
          };

      ServiceHandle.post(
        lastOrderId ? Const.API.EditOrder : Const.API.CreateOrder,
        params,
      )
        .then(res => {
          if (res.ok) {
            navigation.navigate(NAVIGATION_NAME.ConfirmOrder, {
              listChooseProduct: convertList,
              orderId: res.data.orderId,
            });
          } else {
            setTimeout(() => {
              SimpleToast.show(res.error, SimpleToast.SHORT);
            }, 700);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setVisibleDialog(true);
      setContentDialog(trans('cartNotEmpty'));
    }
  };

  const addQuantity = item => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.productId === item?.productId) {
        elm.quantity += 1;
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  const lessQuantity = item => {
    if (item.quantity > 1) {
      const newData = [...listChooseProduct].map(elm => {
        if (elm?.productId === item?.productId) {
          elm.quantity -= 1;
        }
        return elm;
      });
      setListChooseProduct(newData);
    } else {
      const newData = [...listChooseProduct].filter(
        elm => elm.productId !== item.productId,
      );
      setListChooseProduct(newData);
    }
  };

  const changeQuantity = (valueInput, item) => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.productId === item?.productId) {
        elm.quantity = Number(valueInput);
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  // const checkIn = () => {
  //   const params = {
  //     customerId: customer.partyIdTo,
  //     latitude: location.latitude,
  //     longitude: location.longitude,
  //   };
  //   post(BaseUrl + Const.API.SalesmanCheckIn, params).then((res) => {
  //     if (res.ok) {
  //       if (res.data.checkInOk) {
  //         dispatch(CustomerRedux.Actions.checkIn(customer.partyIdTo));
  //         navigation.setParams({item: {...customer, status: 'VISITING'}});
  //         SimpleToast.show(trans('checkInDone'), SimpleToast.SHORT);
  //       } else {
  //         setErrMess(res.data.message);
  //         setModalErr(true);
  //       }
  //     }
  //   });
  // };

  const checkIn = async () => {
    setLoading(true);
    try {
      const locationPermission = await hasLocationPermission();

      if (!locationPermission) {
        return;
      }
      Geolocation.getCurrentPosition(
        position => {
          const params = {
            customerId: customer.partyId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          ServiceHandle.post(Const.API.SalesmanCheckIn, params).then(res => {
            if (res.ok) {
              if (res.data.checkInOk === 'Y') {
                navigation.setParams({item: {...customer, checkInOk: 'Y'}});
                Toast.show({
                  type: 'success',
                  text1: trans('checkInDone'),
                  visibilityTime: 2000,
                });
              } else {
                setTimeout(() => {
                  SimpleToast.show(res.data.message, SimpleToast.SHORT);
                }, 700);
              }
            } else {
              setTimeout(() => {
                SimpleToast.show(res.error, SimpleToast.SHORT);
              }, 700);
            }
          });
        },
        error => {
          console.log('error', error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: true,
          showLocationDialog: true,
        },
      );
    } catch (error) {
      setTimeout(() => {
        SimpleToast.show(error, SimpleToast.SHORT);
      }, 700);
    } finally {
      setLoading(false);
    }
  };

  // const checkOutxx = () => {
  //   const params = {
  //     customerId: customer.partyIdTo,
  //     latitude: location.latitude,
  //     longitude: location.longitude,
  //   };
  //   post(BaseUrl + Const.API.SalesmanCheckOut, params).then((res) => {
  //     if (res.ok) {
  //       dispatch(CustomerRedux.Actions.checkOut(customer.partyIdTo));
  //       navigation.setParams({item: {...customer, status: 'VISITED'}});
  //       SimpleToast.show(trans('checkOutDone'), SimpleToast.SHORT);
  //     }
  //   });
  // };

  const checkOut = async () => {
    setLoading(true);
    try {
      const locationPermission = await hasLocationPermission();
      if (!locationPermission) {
        return;
      }
      Geolocation.getCurrentPosition(
        position => {
          const params = {
            customerId: customer.partyId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            // latitude: 20.9897377,
            // longitude: 105.8182346,
          };
          ServiceHandle.post(Const.API.SalesmanCheckOut, params).then(res => {
            if (res.ok) {
              if (res.data.checkOutOk === 'Y') {
                navigation.setParams({item: {...customer, checkOutOk: 'Y'}});
                Toast.show({
                  type: 'success',
                  text1: trans('checkOutDone'),
                  visibilityTime: 2000,
                });
              } else {
                setTimeout(() => {
                  SimpleToast.show(res.data.message, SimpleToast.SHORT);
                }, 700);
              }
            } else {
              setTimeout(() => {
                SimpleToast.show(res.error, SimpleToast.SHORT);
              }, 700);
            }
          });
        },
        error => {
          console.log('error', error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: true,
          showLocationDialog: true,
        },
      );
    } catch (error) {
      setTimeout(() => {
        SimpleToast.show(error, SimpleToast.SHORT);
      }, 700);
    } finally {
      setLoading(false);
    }
  };

  const onInventory = () => {
    if (customer.checkInOk === 'N') {
      setErrMess(trans('notCheckIn'));
      setModalErr(true);
    } else {
      navigation.navigate(NAVIGATION_NAME.Inventory, {
        item: customer,
      });
    }
  };

  const onRecentDate = () => {
    if (customer.checkInOk === 'N') {
      setErrMess(trans('notCheckIn'));
      setModalErr(true);
    } else {
      navigation.navigate(NAVIGATION_NAME.RecentDate, {
        item: customer,
      });
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
        <Appbar.Content title={trans('createOrder')} />
        {/* <Appbar.Action icon="trash-can-outline" onPress={openModalDelete} /> */}
        <Appbar.Action icon="telegram" onPress={goConfirmOrder} />
      </Appbar.Header>

      <TouchableWithoutFeedback>
        <SearchProductComponent
          data={listProduct}
          selectProduct={chooseProduct}
          onChangeText={searchProduct}
        />
      </TouchableWithoutFeedback>

      <ItemCustomer
        item={customer}
        containerStyle={styles.viewStore}
        disabled
        // type={
        //   (listCustomer.filter(elm => elm.status === 'VISITING').length === 0 ||
        //     customer.status === 'VISITING') &&
        //   'create-order'
        // }
        type="create-order"
        checkInAndCheckOut={customer.checkInOk === 'N' ? checkIn : checkOut}
        onInventory={onInventory}
        onNearDate={onRecentDate}
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
        onPressConfirm={deleteProduct}
      />
      <AppDialog
        content={errMess}
        isVisible={modalErr}
        onPressClose={() => setModalErr(false)}
      />
    </View>
  );
};

export default SelectProduct;

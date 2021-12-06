import React, {useEffect, useRef, useState} from 'react';
import {Animated, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {
  Button,
  CardItem,
  SearchProductComponent,
} from '../../../../components/molecules';
import {ServiceHandle} from '../../../../services';
import {container} from '../../../../styles/GlobalStyles';
import {Const, trans} from '../../../../utils';
import {AppText} from '../../../../components/atoms';
import SelectDate from '../../component/SelectDate';
import moment from 'moment';
import {Colors, Mixin} from '../../../../styles';
import {SwipeListView} from 'react-native-swipe-list-view';
import {getBottomSpace, isIphoneX} from '../../../../helpers/iphoneXHelper';
import {NAVIGATION_NAME} from '../../../../navigations';
import {useSelector} from 'react-redux';

const SelectProduct = ({navigation, route}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const {supplierId} = route.params;
  const [listProduct, setListProduct] = useState([]);

  const [searchString, setSearchString] = useState('');

  const [startDate, setStartDate] = useState(
    moment().subtract(3, 'day').format('DD/MM/YYYY'),
  );

  const [endDate, setEndDate] = useState(moment().format('DD/MM/YYYY'));

  const [listChooseProduct, setListChooseProduct] = useState([]);

  const animationIsRunning = useRef(false);

  const rowTranslateAnimatedValues = {};
  listChooseProduct.map(elm => {
    rowTranslateAnimatedValues[elm.productId] = new Animated.Value(1);
  });

  useEffect(() => {
    const params = {
      viewSize: 200,
      viewIndex: 0,
      searchString,
      supplierId: supplierId,
    };
    ServiceHandle.post(Const.API.FindProductInfoMobilemcs, params).then(res => {
      if (res.ok) {
        setListProduct(res.data.listProducts);
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  }, [searchString, supplierId]);

  const chooseProduct = item => {
    if (
      !listChooseProduct
        .map(elm => {
          return elm.productId;
        })
        .includes(item.productId)
    ) {
      const newList = [...listChooseProduct];
      newList.push({...item, ...{quantity: 1}});
      setListChooseProduct(newList);
    }
  };

  const addAmount = item => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.productId === item?.productId) {
        elm.quantity += 1;
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  const lessAmount = item => {
    if (item.quantity > 1) {
      const newData = [...listChooseProduct].map(elm => {
        if (elm?.productId === item?.productId) {
          elm.quantity -= 1;
        }
        return elm;
      });
      setListChooseProduct(newData);
    }
  };

  const changeAmount = (valueInput, item) => {
    const newData = [...listChooseProduct].map(elm => {
      if (elm?.productId === item?.productId) {
        elm.quantity = Number(valueInput);
      }
      return elm;
    });
    setListChooseProduct(newData);
  };

  const goPayment = () => {
    const products = listChooseProduct?.map(elm => {
      return {
        productId: elm.productId,
        uomId: elm.isKg === 'Y' ? elm.weightUomId : elm.quantityUomId,
        quantity: elm.quantity.toString(),
        lastPrice: elm.lastPrice.toString(),
      };
    });

    const params = {
      productStoreId: store.productStoreId,
      supplierId,
      orderItems: JSON.stringify(products),
      shipAfterDate: moment(startDate, 'DD/MM/YYYY').valueOf(),
      shipBeforeDate: moment(endDate, 'DD/MM/YYYY').valueOf(),
    };

    navigation.navigate(NAVIGATION_NAME.ConfirmOrder, {
      dataCart: listChooseProduct,
      params,
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

  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <AppText style={styles.backTextWhite}>Delete</AppText>
      </View>
    </View>
  );

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
          addAmountProps={addAmount}
          lessAmountProps={lessAmount}
          changeAmountProps={changeAmount}
          disabled
        />
      </Animated.View>
    );
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('purchaseOrder')} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <SearchProductComponent
          data={listProduct}
          onChangeText={setSearchString}
          selectProduct={chooseProduct}
        />
        <View style={styles.containerDate}>
          <AppText>Giao hàng :</AppText>
          <View style={{flexDirection: 'row'}}>
            <SelectDate
              valueDate={startDate}
              setValueDate={date =>
                setStartDate(moment(date).format('DD/MM/YYYY'))
              }
            />
            <View style={styles.line} />
            <SelectDate
              valueDate={endDate}
              setValueDate={date =>
                setEndDate(moment(date).format('DD/MM/YYYY'))
              }
            />
          </View>
        </View>
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
      </View>
      {listChooseProduct.length >= 1 && (
        <Button
          containerStyle={styles.btnPurchase}
          title={trans('createOrder')}
          onPress={goPayment}
        />
      )}
    </View>
  );
};

export default SelectProduct;

const styles = {
  contentContainer: {
    flex: 1,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    marginTop: 50,
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  line: {
    width: 20,
    backgroundColor: Colors.LIGHT_GREY,
    height: 1,
    alignSelf: 'center',
  },
  containerDate: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY,
    flex: 1,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: Colors.LIGHT_GREY,
    right: 0,
  },
  backTextWhite: {
    color: Colors.WHITE,
  },
  btnPurchase: {
    alignSelf: 'center',
    marginBottom: isIphoneX() ? 34 : 12,
  },
};

import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Appbar} from 'react-native-paper';
import {AppLoading, AppText} from '../../../../components/atoms';
import {container, fontWeightBold} from '../../../../styles/GlobalStyles';
import {Const, trans} from '../../../../utils';
import numeral from 'numeral';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors, Mixin} from '../../../../styles';
import {cloneDeep, forEach} from 'lodash';
import {post} from '../../../../services/ServiceHandle';
import SimpleToast from 'react-native-simple-toast';
import Toast from 'react-native-toast-message';

const ImportItem = ({navigation, route}) => {
  const {orderId} = route.params;

  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = {orderId};
    const getDataReceivable = () => {
      post(Const.API.GetOrderItemReceivableMobilemcs, params)
        .then(res => {
          if (res.ok) {
            const addDebitQuantityToArr = res.data.orderItems
              .map(elm => {
                return {
                  ...elm,
                  ...{debitQuantity: 0, importQuantity: elm.quantityRequired},
                };
              })
              .filter(elm => elm.quantityRequired > 0);
            setDataOrder(addDebitQuantityToArr);
          } else {
            setTimeout(() => {
              SimpleToast.show(res.error, SimpleToast.SHORT);
            }, 700);
          }
        })
        .finally(() => setLoading(false));
    };
    getDataReceivable();
  }, [orderId]);

  const handelCheckValue = () => {
    const convertData = [...dataOrder].filter(elm => {
      return elm.importQuantity + elm.debitQuantity > elm.quantityRequired;
    });
    if (convertData.length > 0) {
      SimpleToast.show('Tổng số lượng không được lớn hơn số lượng chưa nhập');
      return true;
    }
    return false;
  };

  const importItem = () => {
    if (handelCheckValue()) {
      return;
    }

    setLoading(true);
    const products = dataOrder.map(elm => {
      return {
        orderId,
        productId: elm.productId,
        quantity: elm.importQuantity,
        debitQuantity: elm.debitQuantity,
        orderItemSeqId: elm.orderItemSeqId,
      };
    });

    const params = {
      orderId,
      listOrderItems: JSON.stringify(products),
    };
    post(Const.API.ReceiveInventoryFromPOMobilemcs, params)
      .then(res => {
        if (res.ok) {
          Toast.show({
            type: 'success',
            text1: 'Nhập đơn hàng thành công 👋',
            visibilityTime: 2000,
          });
          navigation.goBack();
        } else {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }
      })
      .finally(() => setLoading(false));
  };

  const lessAmount = item => {
    const convertData = [...dataOrder];
    convertData.map(elm => {
      if (elm.productId === item.productId && elm.importQuantity > 0) {
        elm.importQuantity -= 1;
      }
      return elm;
    });
    setDataOrder(convertData);
  };

  const changeAmount = () => {};

  const addAmount = item => {
    const convertData = [...dataOrder];
    convertData.map(elm => {
      if (
        elm.productId === item.productId &&
        elm.importQuantity < elm.quantityRequired
      ) {
        elm.importQuantity += 1;
      }
      return elm;
    });
    setDataOrder(convertData);
  };

  const addDebit = item => {
    const convertData = [...dataOrder];
    convertData.map(elm => {
      if (
        elm.productId === item.productId &&
        elm.debitQuantity < elm.quantityRequired
      ) {
        elm.debitQuantity += 1;
      }
      return elm;
    });
    setDataOrder(convertData);
  };

  const lessDebit = item => {
    const convertData = [...dataOrder];
    convertData.map(elm => {
      if (elm.productId === item.productId && elm.debitQuantity > 0) {
        elm.debitQuantity -= 1;
      }
      return elm;
    });
    setDataOrder(convertData);
  };

  const renderItem = item => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <View style={{flex: 1}}>
          <AppText style={{fontWeight: 'bold'}}>
            {item.productId} ({item.uomId})
          </AppText>
          <AppText>SL cần: {item.quantityRequired}</AppText>
          <AppText>{numeral(item.unitPrice).format()} đ</AppText>
        </View>

        <View style={styles.viewQuantity}>
          <TextInput
            style={styles.boxAmount}
            value={item.importQuantity.toString()}
            keyboardType="number-pad"
            onChangeText={valueInput => changeAmount(valueInput, item)}
          />
          <View>
            <TouchableOpacity onPress={() => addAmount(item)}>
              <Icon name="plus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => lessAmount(item)}>
              <Icon name="minus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewQuantity}>
          <TextInput
            style={[styles.boxAmount, {borderColor: Colors.RED}]}
            value={item.debitQuantity.toString()}
            keyboardType="number-pad"
            onChangeText={valueInput => changeAmount(valueInput, item)}
          />
          <View>
            <TouchableOpacity onPress={() => addDebit(item)}>
              <Icon name="plus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => lessDebit(item)}>
              <Icon name="minus-circle" size={28} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('importItem')} />
        <Appbar.Action icon="telegram" onPress={importItem} />
      </Appbar.Header>
      <View style={{flex: 1, paddingHorizontal: 12}}>
        <View style={{flexDirection: 'row', paddingVertical: 12}}>
          <AppText containerStyle={{flex: 1}} style={fontWeightBold}>
            Tên sản phẩm
          </AppText>
          <AppText
            containerStyle={{flex: 1, alignItems: 'center'}}
            style={fontWeightBold}>
            Số lượng
          </AppText>
          <AppText
            containerStyle={{flex: 1, alignItems: 'center'}}
            style={fontWeightBold}>
            Nợ
          </AppText>
        </View>
        <FlatList
          data={dataOrder}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ImportItem;

const styles = StyleSheet.create({
  viewQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  boxAmount: {
    borderWidth: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.PRIMARY,
    textAlign: 'center',
    color: Colors.BLACK,
    marginRight: 8,
  },
});

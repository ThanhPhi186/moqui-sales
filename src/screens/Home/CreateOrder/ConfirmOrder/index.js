import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppLoading, AppText} from '../../../../components/atoms';
import {Button, CardItem} from '../../../../components/molecules';
import {Colors} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import {Const, trans} from '../../../../utils';
import numeral from 'numeral';
import {ServiceHandle} from '../../../../services';
import SimpleToast from 'react-native-simple-toast';
import Toast from 'react-native-toast-message';

const ConfirmOrder = ({navigation, route}) => {
  const {dataCart} = route.params;
  const {params} = route.params;
  const [orderValue, setOrderValue] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ServiceHandle.post(Const.API.CalculatePOMobilemcs, params).then(res => {
      if (res.ok) {
        setOrderValue(res.data);
      } else {
        SimpleToast.show(res.error, SimpleToast.SHORT);
      }
    });
  }, [params]);

  const submitOrder = () => {
    setLoading(true);
    ServiceHandle.post(Const.API.CreateOrderPurchaseMobilemcs, params)
      .then(res => {
        if (res.ok) {
          Toast.show({
            type: 'success',
            text1: 'Tạo đơn hàng thành công 👋',
            visibilityTime: 2000,
          });
          navigation.popToTop();
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      })
      .finally(() => setLoading(false));
  };

  const renderItem = item => {
    return <CardItem disabled item={item} type="readOnly" />;
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('confirmOrder')} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <View style={styles.containerOrder}>
          <FlatList
            data={dataCart}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.viewPayment}>
          <View style={styles.showPrice}>
            <AppText style={styles.textPay}>{trans('orderValue')}</AppText>
            <AppText style={styles.textPrice}>
              {numeral(orderValue?.orderSubTotal).format()} đ
            </AppText>
          </View>
          <View style={styles.showPrice}>
            <AppText style={styles.textPay}>{trans('tax')}</AppText>
            <AppText style={styles.textPrice}>
              {numeral(orderValue?.orderTaxTotal).format()} đ
            </AppText>
          </View>
          <View style={styles.showPrice}>
            <AppText style={styles.textPay}>{trans('totalPayment')}</AppText>
            <AppText style={styles.textPrice}>
              {numeral(orderValue?.orderGrandTotal).format()} đ
            </AppText>
          </View>
        </View>
        <View style={styles.viewGroupBtn}>
          <Button
            containerStyle={styles.btnCancel}
            title={trans('cancelOrder')}
            onPress={() => {}}
            titleColor={Colors.PRIMARY}
          />
          <Button
            containerStyle={styles.btnOrdered}
            title={trans('confirm')}
            onPress={submitOrder}
          />
        </View>
      </View>
    </View>
  );
};

export default ConfirmOrder;

const styles = {
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  containerOrder: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
  },
  viewPayment: {
    padding: 12,
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 12,
  },
  showPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 3,
  },
  textPay: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
  },
  textPrice: {
    color: Colors.GREEN_1,
  },
  btnCancel: {
    width: '45%',
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  btnOrdered: {
    width: '45%',
  },
  viewGroupBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
};

import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppLoading, AppText} from '../../../../components/atoms';
import {container} from '../../../../styles/GlobalStyles';
import {Const, trans} from '../../../../utils';
import {
  AppDialog,
  Button,
  CardItem,
  ItemInfo,
} from '../../../../components/molecules';
import {Colors, Mixin} from '../../../../styles';
import {ServiceHandle} from '../../../../services';
import SimpleToast from 'react-native-simple-toast';
import {isIphoneX} from '../../../../helpers/iphoneXHelper';
import {NAVIGATION_NAME} from '../../../../navigations';
import {handleStatus} from '../../../../helpers/mcsHelper';
import {FONT_SIZE_16} from '../../../../styles/Typography';
import Toast from 'react-native-toast-message';

const DetailPO = ({navigation, route}) => {
  const {orderId} = route.params;
  const [loading, setLoading] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [modalApprove, setModalApprove] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);

  useEffect(() => {
    // const focusScreen = navigation.addListener('focus', () => {
    getDetailOrder(orderId);
    // });
    // return focusScreen;
  }, [navigation, orderId]);

  const onGoBack = () => {
    navigation.goBack();
    getDetailOrder(orderId);
  };

  const getDetailOrder = id => {
    setLoading(true);
    const params = {
      orderId: id,
    };
    ServiceHandle.post(Const.API.GetDetailPOMobilemcs, params)
      .then(res => {
        if (res.ok) {
          setDataDetail(res.data);
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      })
      .finally(() => setLoading(false));
  };

  const approveOrder = () => {
    setModalApprove(false);
    ServiceHandle.post(Const.API.ApprovePOMobilemcs, {orderId}).then(res => {
      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: trans('approveOrderSuccess'),
          visibilityTime: 2000,
        });
        getDetailOrder(orderId);
      } else {
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  };

  const cancelOrder = () => {
    setModalCancel(false);
    ServiceHandle.post(Const.API.CancelPOMobilemcs, {orderId}).then(res => {
      if (res.ok) {
        Toast.show({
          type: 'success',
          text1: trans('cancelOrderSuccess'),
          visibilityTime: 2000,
        });
        navigation.goBack();
      } else {
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  };

  const renderItem = item => {
    return <CardItem item={item} type="readOnly" />;
  };

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('detailOrder')} />
        {dataDetail.statusId !== Const.ORDER_STATUS.CANCELLED &&
          dataDetail.statusId !== Const.ORDER_STATUS.COMPLETED && (
            <Appbar.Action
              icon="pencil"
              onPress={() =>
                navigation.navigate(NAVIGATION_NAME.EditPO, {
                  orderDetail: dataDetail,
                  onGoBack,
                })
              }
            />
          )}
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <AppText style={styles.txtStatus}>
          {handleStatus(dataDetail.statusId)}
        </AppText>
        <View style={styles.content}>
          <ItemInfo title={trans('codeOrder')} value={dataDetail.orderId} />
          <ItemInfo
            title={trans('supplierName')}
            value={dataDetail.supplierName}
          />
          <ItemInfo
            title={trans('supplierId')}
            value={dataDetail.supplierCode}
          />
          <ItemInfo title={trans('createdTime')} value={dataDetail.orderDate} />
          <ItemInfo title={trans('createBy')} value={dataDetail.createdBy} />
        </View>
        <View style={styles.content}>
          <ItemInfo
            title={trans('orderValue')}
            value={dataDetail.remainingSubTotal}
            price
          />
          <ItemInfo title={trans('tax')} value={dataDetail.taxTotal} price />
          <ItemInfo
            title={trans('totalPayment')}
            value={dataDetail.grandTotal}
            price
          />
        </View>
        <View style={[styles.content, {flex: 2}]}>
          <AppText style={styles.txtTitle}>{trans('itemsList')} :</AppText>
          <FlatList
            data={dataDetail.orderItems}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.viewGroupBtn}>
          <Button
            containerStyle={styles.btnCancel}
            title={trans('cancelOrder')}
            onPress={() => setModalCancel(true)}
            titleColor={Colors.PRIMARY}
            disabled={dataDetail.statusId !== Const.ORDER_STATUS.CREATED}
          />
          {dataDetail.statusId === Const.ORDER_STATUS.APPROVED &&
          (!dataDetail.mainSupplier ||
            (dataDetail.mainSupplier &&
              dataDetail.isSupplierApproved === 'Y')) ? (
            <Button
              containerStyle={styles.btnOrdered}
              title={trans('importItem')}
              onPress={() =>
                navigation.navigate(NAVIGATION_NAME.ImportItem, {
                  orderId: dataDetail.orderId,
                })
              }
            />
          ) : (
            <Button
              containerStyle={styles.btnOrdered}
              title={trans('approve')}
              onPress={() => setModalApprove(true)}
              disabled={dataDetail.statusId !== Const.ORDER_STATUS.CREATED}
            />
          )}
        </View>
      </View>
      <AppDialog
        content={trans('confirmApproveOrder')}
        isVisible={modalApprove}
        onPressClose={() => setModalApprove(false)}
        onPressConfirm={approveOrder}
      />
      <AppDialog
        content={trans('confirmCancelOrder')}
        isVisible={modalCancel}
        onPressClose={() => setModalCancel(false)}
        onPressConfirm={cancelOrder}
      />
    </View>
  );
};
export default DetailPO;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: isIphoneX() ? 26 : 12,
  },
  content: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 12,
    marginTop: 12,
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
  txtTitle: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
  containerItem: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  boxAmount: {
    borderWidth: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.PRIMARY,
  },
  viewImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: Mixin.moderateSize(52),
    height: Mixin.moderateSize(52),
    borderRadius: 8,
  },
  leftContent: {
    flex: 3,
  },
  nameProduct: {
    fontWeight: 'bold',
  },
  info: {
    fontStyle: 'italic',
  },
  txtStatus: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: FONT_SIZE_16,
    color: Colors.PRIMARY,
  },
  viewGroupBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
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
});

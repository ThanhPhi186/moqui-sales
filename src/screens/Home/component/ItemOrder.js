import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import numeral from 'numeral';
import {Colors, Mixin} from '../../../styles';
import {trans} from '../../../utils';
import {AppText} from '../../../components/atoms';
import {handleStatus} from '../../../helpers/mcsHelper';

const ItemOrder = props => {
  const {item} = props;

  const renderColorStatus = status => {
    switch (status) {
      case 'ORDER_APPROVED':
        return Colors.BLUE_CODE.blue600;
      case 'ORDER_CANCELLED':
        return Colors.RED_CODE.red500;
      case 'ORDER_COMPLETED':
        return Colors.GREEN_1;
      case 'ORDER_CREATED':
        return Colors.ORANGE_CODE.orange600;
      case 'ORDER_HOLD':
        return trans('hasKept'); // Đã giữ
      case 'ORDER_IN_TRANSIT':
        return Colors.LIME_CODE.lime800;
      case 'ORDER_PROCESSING':
        return trans('processing'); // Processing
      case 'ORDER_REJECTED':
        return trans('wasRejected'); // Đã bị từ chối
      case 'ORDER_SADAPPROVED':
        return trans('salesAdminApproved'); // Sales Admin approved
      case 'ORDER_DELIVERED':
        return Colors.CYAN_CODE.cyan600;
    }
  };

  return (
    <TouchableOpacity {...props} style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <AppText>
          Mã đơn hàng: <Text style={styles.code}>{item.orderId}</Text>
        </AppText>
        <AppText
          style={styles.status}
          containerStyle={{
            backgroundColor: renderColorStatus(item.statusId),
            padding: 8,
            borderRadius: 8,
          }}>
          {handleStatus(item.statusId)}
        </AppText>
      </View>
      <AppText>
        Tổng tiền:{' '}
        <Text style={styles.code}>{numeral(item.grandTotal).format()} đ</Text>
      </AppText>
      <AppText style={{marginTop: 8}}>
        Thời gian tạo: <Text>{item.orderDate}</Text>
      </AppText>
    </TouchableOpacity>
  );
};
export default ItemOrder;

const styles = {
  container: {
    width: '90%',

    alignSelf: 'center',
    ...Mixin.padding(8, 16, 8, 16),
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftContent: {
    justifyContent: 'space-between',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  code: {
    fontWeight: 'bold',
  },
  status: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
};

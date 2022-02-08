import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {ItemInfo} from '../../../../components/molecules';
import {Const, trans} from '../../../../utils';
import styles from './styles';
import moment from 'moment';
import {AppText} from '../../../../components/atoms';
import SimpleToast from 'react-native-simple-toast';
import {ServiceHandle} from '../../../../services';
import numeral from 'numeral';

const PromotionDetail = ({navigation, route}) => {
  const {storePromotionId} = route.params;

  const [rules, setRules] = useState([]);
  const [dataDetail, setDataDetail] = useState({});

  useEffect(() => {
    const params = {
      storePromotionId,
    };
    ServiceHandle.get(Const.API.GetPromoDetail, params).then(res => {
      if (res.ok) {
        setDataDetail(res.data.promoDetail);
        setRules(res.data.promoRules);
      } else {
        setTimeout(() => {
          SimpleToast.show(res.error, SimpleToast.SHORT);
        }, 700);
      }
    });
  }, [storePromotionId]);

  const renderPromotionName = value => {
    if (value.includes('customerId')) {
      return 'Khách hàng';
    }
    if (value.includes('partyClassificationId')) {
      return 'Nhóm khách hàng';
    }
    if (value.includes('grandTotalFrom')) {
      return 'Tổng giá trị đơn hàng từ';
    }
    if (value.includes('grandTotalTo')) {
      return 'Tổng giá trị đơn hàng đến';
    }
    if (value.includes('productId')) {
      return 'Sản phẩm';
    }
    if (value.includes('productQuantity')) {
      return 'Số lượng';
    }
    if (value.includes('discountValue')) {
      return 'Giá trị thưởng';
    }
    if (value.includes('discountPercent')) {
      return 'Phần trăm thưởng';
    }
    if (value.includes('discountProductId')) {
      return 'Mã sản phẩm được thưởng';
    }
    if (value.includes('discountProductQuantity')) {
      return 'Số lượng sản phẩm thưởng';
    }
  };

  const renderPromotionValue = (id, name, value) => {
    const parameterName = name.replace(`${id}.`, '');
    if (
      parameterName === 'grandTotalFrom' ||
      parameterName === 'grandTotalTo' ||
      parameterName === 'discountValue'
    ) {
      return numeral(value).format() + ' đ';
    }
    if (parameterName === 'discountPercent') {
      return numeral(value).format() + ' %';
    }
    return value;
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('detailPromotion')} />
      </Appbar.Header>
      <View style={styles.content}>
        <AppText style={styles.title}>{trans('basicInfo')}</AppText>
        <View style={styles.containerItem}>
          <ItemInfo
            title={trans('promotionName')}
            value={dataDetail.itemDescription}
          />
          <ItemInfo
            title={trans('promotionCode')}
            value={dataDetail.storePromotionId}
          />
          <ItemInfo title={trans('content')} value={dataDetail.description} />
          <ItemInfo
            title={trans('fromeDate')}
            value={moment(dataDetail.fromDate).format('DD-MM-YYYY')}
          />
          <ItemInfo
            title={trans('toDate')}
            value={moment(dataDetail.thruDate).format('DD-MM-YYYY')}
          />
        </View>
        <AppText style={styles.title}>{trans('promotion')}</AppText>
        <View style={styles.containerItem}>
          {rules.discounts?.map((elm, index) => {
            return (
              <View key={index}>
                <AppText style={styles.title}>
                  {renderPromotionName(elm.parameterName)} :{' '}
                  {renderPromotionValue(
                    elm.storePromotionId,
                    elm.parameterName,
                    elm.parameterValue,
                  )}
                </AppText>
              </View>
            );
          })}
        </View>
        <AppText style={styles.title}>{trans('applicableLaw')}</AppText>
        <View style={styles.containerItem}>
          {rules.rules?.map((elm, index) => {
            return (
              <View key={index}>
                <AppText style={styles.title}>
                  {renderPromotionName(elm.parameterName)} :{' '}
                  {renderPromotionValue(
                    elm.storePromotionId,
                    elm.parameterName,
                    elm.parameterValue,
                  )}
                </AppText>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
export default PromotionDetail;

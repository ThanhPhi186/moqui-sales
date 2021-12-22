import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {ItemInfo} from '../../../../components/molecules';
import {Const, trans} from '../../../../utils';
import styles from './styles';
import moment from 'moment';
import {AppText} from '../../../../components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {post} from '../../../../services/ServiceHandle';
import {AuthenOverallRedux} from '../../../../redux/authen';
import SimpleToast from 'react-native-simple-toast';
import {ServiceHandle} from '../../../../services';
import numeral from 'numeral';

const PromotionDetail = ({navigation, route}) => {
  const {storePromotionId} = route.params;

  const [rules, setRules] = useState([]);
  const [dataDetail, setDataDetail] = useState({});
  const [modalLogout, setModalLogout] = useState(false);
  const dispatch = useDispatch();

  console.log('basicInfo', storePromotionId);

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

  const renderPromotionName = (id, value) => {
    const parameterName = value.replace(`${id}.`, '');
    switch (parameterName) {
      case 'customerId':
        return 'Khách hàng';
      case 'partyClassificationId':
        return 'Nhóm khách hàng';
      case 'grandTotalFrom':
        return 'Tổng giá trị đơn hàng từ';
      case 'grandTotalTo':
        return 'Tổng giá trị đơn hàng đến';
      case 'productId':
        return 'Sản phẩm';
      case 'productQuantity':
        return 'Số lượng';
      case 'discountValue':
        return 'Giá trị thưởng';
      case 'discountPercent':
        return 'Phần trăm thưởng';
      case 'discountProductId':
        return 'Mã sản phẩm được thưởng';
      case 'discountProductQuantity':
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
        <AppText style={styles.title}>{trans('applicableLaw')}</AppText>
        <View style={styles.containerItem}>
          {rules.map((elm, index) => {
            return (
              <View key={index}>
                <AppText style={styles.title}>
                  {renderPromotionName(elm.storePromotionId, elm.parameterName)}{' '}
                  :{' '}
                  {renderPromotionValue(
                    elm.storePromotionId,
                    elm.parameterName,
                    elm.parameterValue,
                  )}
                </AppText>
                {/* <AppText>{elm.parameterValue}</AppText> */}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
export default PromotionDetail;

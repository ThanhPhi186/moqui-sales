import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppDialog, ItemInfo} from '../../../../components/molecules';
import {Const, trans} from '../../../../utils';
import styles from './styles';
import moment from 'moment';
import {AppText} from '../../../../components/atoms';
import {useDispatch, useSelector} from 'react-redux';
import {post} from '../../../../services/ServiceHandle';
import {AuthenOverallRedux} from '../../../../redux/authen';
import SimpleToast from 'react-native-simple-toast';
import {ServiceHandle} from '../../../../services';

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
                <AppText style={styles.title}>{elm.parameterName}</AppText>
                <AppText>{elm.parameterValue}</AppText>
              </View>
            );
          })}
        </View>
      </View>
      <AppDialog
        content={trans('expiredToken')}
        isVisible={modalLogout}
        onPressClose={() => {
          setModalLogout(false);
          setTimeout(() => {
            dispatch(AuthenOverallRedux.Actions.logout.request());
          }, 500);
        }}
      />
    </View>
  );
};
export default PromotionDetail;

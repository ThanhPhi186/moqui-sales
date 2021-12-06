import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {AppText} from '../../../../components/atoms';
import {ItemInfo} from '../../../../components/molecules';
import {ServiceHandle} from '../../../../services';
import {Colors, Mixin} from '../../../../styles';
import {container, fontWeightBold} from '../../../../styles/GlobalStyles';
import {FONT_SIZE_20} from '../../../../styles/Typography';
import {Const, trans} from '../../../../utils';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NAVIGATION_NAME} from '../../../../navigations';
import {isEmpty} from 'lodash';

const DetailPricePolicy = ({navigation, route}) => {
  const {productQuotationId} = route.params;
  const [detailPricePolicy, setDetailPricePolicy] = useState();

  useEffect(() => {
    const params = {
      productQuotationId,
    };
    ServiceHandle.post(Const.API.GetQuotationInfoMobilemcs, params).then(
      res => {
        if (res.ok) {
          setDetailPricePolicy(res.data);
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      },
    );
  }, [productQuotationId]);

  const goApplicableStore = () => {
    navigation.navigate(NAVIGATION_NAME.ListApplicableStore, {
      data: detailPricePolicy.productStoreAppls,
      type: 'store',
    });
  };

  const goApplicableStoreGroup = () => {
    if (isEmpty(detailPricePolicy.detailPricePolicy)) {
      SimpleToast.show('Chưa có dữ liệu ở mục này', SimpleToast.SHORT);
    } else {
      navigation.navigate(NAVIGATION_NAME.ListApplicableStore, {
        data: detailPricePolicy.listStatusInfo,
        type: 'group',
      });
    }
  };

  const goStatusEditHistory = () => {
    navigation.navigate(NAVIGATION_NAME.ListApplicableStore, {
      data: detailPricePolicy.listStatusInfo,
      type: 'status',
    });
  };

  const renderApplyComponent = (title, onPress) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.infoPolicy,
          {flexDirection: 'row', justifyContent: 'space-between'},
        ]}>
        <AppText style={fontWeightBold}>{title}</AppText>
        <AppText style={styles.txtSeeDetail}>{trans('seeDetails')}</AppText>
      </TouchableOpacity>
    );
  };

  const renderApplyProduct = (
    <View style={styles.infoPolicy}>
      <AppText style={styles.productName} containerStyle={styles.viewTitle}>
        {trans('applicableProducts')} :
      </AppText>
      {detailPricePolicy?.listProductQuotationRuleData.map((elm, index) => {
        return elm.categoryName ? (
          <View
            style={{
              borderBottomWidth: 0.5,
              marginVertical: 8,
              paddingBottom: 8,
            }}
            key={index}>
            <AppText style={{fontWeight: 'bold', marginBottom: 4}}>
              {elm.categoryName}
            </AppText>
            <AppText style={{marginBottom: 4}}>
              {elm.productQuotationId}
            </AppText>
            <AppText>{elm.amount}</AppText>
          </View>
        ) : (
          <View
            style={{
              borderBottomWidth: 0.5,
              marginVertical: 8,
              paddingBottom: 8,
            }}
            key={index}>
            <AppText style={{fontWeight: 'bold', marginBottom: 4}}>
              {elm.productName}
            </AppText>
            <AppText style={{marginBottom: 4}}>{elm.productId}</AppText>
            <AppText>
              {elm.quantityUomDesc} - {elm.taxPercentage} -{' '}
              {elm.priceToDistNormalAfterVAT}
            </AppText>
          </View>
        );
      })}
    </View>
  );

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('detailPricePolicy')} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <View style={styles.infoPolicy}>
          {/* <View style={styles.viewProductName}>
            <AppText
              style={styles.productName}
              containerStyle={styles.viewTitle}>
              {detailPricePolicy?.quotationName}
            </AppText>
          </View> */}
          <ItemInfo
            title={trans('name')}
            value={detailPricePolicy?.quotationName}
          />
          <ItemInfo
            title={trans('id')}
            value={detailPricePolicy?.productQuotationId}
          />
          <ItemInfo
            title={trans('startDate')}
            value={moment(detailPricePolicy?.fromDate, 'DD-MM-YYYY').format(
              'DD-MM-YYYY',
            )}
          />
          <ItemInfo
            title={trans('unit')}
            value={detailPricePolicy?.currencyUomId}
          />
        </View>
        {renderApplyComponent(trans('applicableStore'), goApplicableStore)}
        {renderApplyComponent(
          trans('applicableStoreGroup'),
          goApplicableStoreGroup,
        )}
        {renderApplyComponent(trans('statusEditHistory'), goStatusEditHistory)}
        {renderApplyProduct}
      </View>
    </View>
  );
};
export default DetailPricePolicy;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  infoPolicy: {
    borderRadius: 12,
    ...Mixin.padding(12, 20, 12, 20),
    ...Mixin.margin(12, 12, 0, 12),
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
  viewProductName: {
    borderBottomWidth: 1,
    paddingVertical: Mixin.moderateSize(8),
    borderColor: Colors.WHITE_SMOKE,
  },
  productName: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: FONT_SIZE_20,
    color: Colors.GRAY,
  },
  viewInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSeeDetail: {
    color: Colors.PRIMARY,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
});

import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {AppLoading, AppText} from '../../../components/atoms';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import moment from 'moment';
import SelectDate from '../component/SelectDate';
import {ServiceHandle} from '../../../services';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import numeral from 'numeral';
import styles from './styles';

const ListPriceChange = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);
  const [listPriceChange, setListPriceChange] = useState([]);
  const [startDate, setStartDate] = useState(
    moment().subtract(1, 'months').format('DD/MM/YYYY'),
  );
  const [endDate, setEndDate] = useState(moment().format('DD/MM/YYYY'));

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getListPriceChange = () => {
      setLoading(true);
      const params = {
        productStoreId: store.productStoreId,
        fromDateStr: moment(startDate, 'DD/MM/YYYY').unix() * 1000,
        thruDateStr: moment(endDate, 'DD/MM/YYYY').unix() * 1000,
        viewIndex: 0,
        viewSize: 50,
      };
      ServiceHandle.post(Const.API.GetListPriceChangeMobilemcs, params)
        .then(res => {
          console.log('ress', res);
          if (res.ok) {
            setListPriceChange(res.data.listProPriceChanges);
          } else {
            setTimeout(() => {
              SimpleToast.show(res.error, SimpleToast.SHORT);
            }, 700);
          }
        })
        .finally(res => setLoading(false));
    };
    getListPriceChange();
  }, [startDate, endDate, store.productStoreId]);

  const renderItem = item => {
    return (
      <View style={styles.containerItem}>
        <AppText style={styles.nameProduct}>
          {item.internalName || item.productName}
        </AppText>
        <AppText style={styles.txtInfo}>
          {item.productCode} - {item.uomId}
        </AppText>
        <View style={styles.viewRow}>
          <AppText style={styles.txtInfo}>
            {numeral(item.priceVAT).format('0,0')}đ - {trans('listedPrice')} :
          </AppText>
          <AppText
            style={[
              styles.txtInfo,
              item.priceVAT !== item.unitListPriceVAT && styles.txtInfoChange,
            ]}>
            {' '}
            {numeral(item.unitListPriceVAT).format('0,0')} đ
          </AppText>
        </View>
      </View>
    );
  };
  const renderEmptyComponent = () => {
    return <AppText style={styles.txtEmpty}>{trans('noDataYet')}</AppText>;
  };

  return (
    <View style={container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('listPriceChange')} />
      </Appbar.Header>
      <AppLoading isVisible={loading} />
      <View style={styles.contentContainer}>
        <View style={styles.containerChooseDate}>
          <AppText>Thời gian:</AppText>
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
        <FlatList
          data={listPriceChange}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </View>
  );
};

export default ListPriceChange;

import React, {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, View} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {AppLoading} from '../../../../components/atoms';
import {Button} from '../../../../components/molecules';
import {NAVIGATION_NAME} from '../../../../navigations';
import {ServiceHandle} from '../../../../services';
import {Colors} from '../../../../styles';
import {container} from '../../../../styles/GlobalStyles';
import {FONT_SIZE_14} from '../../../../styles/Typography';
import {Const, trans} from '../../../../utils';
import ComponentSearch from '../../component/ComponentSearch';
import ItemOrder from '../../component/ItemOrder';

const ListPO = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);
  const [dataOrder, setDataOrder] = useState([]);
  const [displaySearch, setDisplaySearch] = useState(false);

  const [statusId, setStatusId] = useState(null);
  const [statusList, setStatusList] = useState([
    {label: 'Dự kiến', value: 'ORDER_ESTIMATED'},
    {label: 'Mới tạo', value: 'ORDER_CREATED'},
    {label: 'Đã duyệt', value: 'ORDER_APPROVED'},
    {label: 'Hoàn thành', value: 'ORDER_COMPLETED'},
  ]);

  const [isSupplierApproved, setIsSupplierApproved] = useState(null);
  const [supplierApprovedData, setSupplierApprovedData] = useState([
    {label: 'Đã xác nhận', value: 'Y'},
    {label: 'Chưa xác nhận', value: 'N'},
  ]);

  const [supplierId, setSupplierId] = useState(null);
  const [supplierList, setSupplierList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const params = {
      searchString: '',
      productStoreId: store.productStoreId,
      statusId: null,
      supplierId: null,
      isSupplierApproved: null,
      viewSize: 50,
      viewIndex: 0,
    };

    const focusScreen = navigation.addListener('focus', () => {
      getListOrderPO(params);
    });
    return focusScreen;
  }, [navigation, store.productStoreId]);

  useEffect(() => {
    const getListSupplier = () => {
      const params = {
        viewSize: 0,
        viewIndex: 0,
      };
      ServiceHandle.post(Const.API.GetListSupplierMobilemcs, params)
        .then(res => {
          if (res.ok) {
            const convertSupplier = res.data.listSuppliers.map(elm => {
              return {
                label: elm.groupName,
                value: elm.partyId,
              };
            });
            setSupplierList(convertSupplier);
          } else {
            console.log('error', res.error);
          }
        })
        .finally(() => setLoading(false));
    };
    displaySearch && getListSupplier();
  }, [displaySearch]);

  const getListOrderPO = async params => {
    setLoading(true);
    ServiceHandle.post(Const.API.GetListPOMobilemcs, params)
      .then(res => {
        if (res.ok) {
          setDataOrder(res.data.listOrders);
        } else {
          setTimeout(() => {
            SimpleToast.show(res.error, SimpleToast.SHORT);
          }, 700);
        }
      })
      .finally(() => setLoading(false));
  };

  const gotoSearch = () => {
    const params = {
      searchString,
      productStoreId: store.productStoreId,
      statusId,
      supplierId,
      isSupplierApproved,
      viewSize: 50,
      viewIndex: 0,
    };
    getListOrderPO(params);
  };

  const renderItem = ({item}) => {
    return (
      <ItemOrder
        item={item}
        onPress={() =>
          navigation.navigate(NAVIGATION_NAME.DetailPO, {orderId: item.orderId})
        }
      />
    );
  };

  const renderSearch = (
    <View style={styles.containerSearch}>
      <ComponentSearch
        title="Tìm kiếm"
        type="withIcon"
        onChangeText={setSearchString}
      />
      <ComponentSearch
        type="dropdown"
        title="Trạng thái"
        value={statusId}
        setValue={setStatusId}
        items={statusList}
        setItems={setStatusList}
        zIndexContainer={3}
      />
      <ComponentSearch
        type="dropdown"
        title="Nhà CC"
        value={supplierId}
        setValue={setSupplierId}
        items={supplierList}
        setItems={setSupplierList}
        zIndexContainer={2}
      />
      <ComponentSearch
        type="dropdown"
        title="TT Khovt"
        value={isSupplierApproved}
        setValue={setIsSupplierApproved}
        items={supplierApprovedData}
        setItems={setSupplierApprovedData}
        zIndexContainer={1}
      />

      <View style={styles.viewBtn}>
        <Button
          title="Bỏ tìm kiếm"
          containerStyle={styles.btnSearch}
          titleStyle={styles.txtBtnSearch}
          onPress={() => setDisplaySearch(false)}
        />
        <Button
          title="Tìm kiếm"
          containerStyle={styles.btnSearch}
          titleStyle={styles.txtBtnSearch}
          onPress={gotoSearch}
        />
      </View>
    </View>
  );

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={trans('orderList')} />
        <Appbar.Action
          icon={displaySearch ? 'close' : 'magnify'}
          onPress={() => setDisplaySearch(!displaySearch)}
        />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        {displaySearch && renderSearch}
        <FlatList
          data={dataOrder}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <FAB style={styles.fab} icon="plus" />
    </View>
  );
};
export default ListPO;

const styles = {
  contentContainer: {
    flex: 1,
  },
  containerSearch: {
    backgroundColor: Colors.WHITE,
    padding: 12,
    zIndex: 9999, // ios
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  btnSearch: {
    width: '48%',
    height: 40,
    borderRadius: 8,
  },
  txtBtnSearch: {
    fontSize: FONT_SIZE_14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: Colors.PRIMARY,
  },
};

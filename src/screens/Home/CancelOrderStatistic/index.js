import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import {AppLoading, AppText} from '../../../components/atoms';
import {ServiceHandle} from '../../../services';
import {Colors, Mixin} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {Const, trans} from '../../../utils';
import moment from 'moment';
import numeral from 'numeral';
import {FONT_SIZE_16} from '../../../styles/Typography';

const CancelOrderStatistic = ({navigation}) => {
  const store = useSelector(state => state.StoreReducer.store);

  const [loading, setLoading] = useState(false);

  return (
    <View style={container}>
      <AppLoading isVisible={loading} />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Báo cáo cửa hàng" />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        <AppText style={styles.txtEmpty}>Tính năng đang phát triển</AppText>
      </View>
    </View>
  );
};
export default CancelOrderStatistic;

const styles = {
  contentContainer: {
    flex: 1,
  },
  containerItem: {
    backgroundColor: Colors.WHITE,
    ...Mixin.margin(12, 12, 0, 12),
    ...Mixin.padding(12),
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
  nameProduct: {
    fontWeight: 'bold',
  },
  txtInfo: {
    fontStyle: 'italic',
    paddingTop: Mixin.moderateSize(8),
  },
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: Mixin.moderateSize(80),
  },
};

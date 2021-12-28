import React, {useState} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {AppLoading, AppText} from '../../../components/atoms';
import {Colors, Mixin} from '../../../styles';
import {container} from '../../../styles/GlobalStyles';
import {FONT_SIZE_16} from '../../../styles/Typography';

const ShopReport = ({navigation}) => {
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
export default ShopReport;

const styles = {
  contentContainer: {
    flex: 1,
  },
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: Mixin.moderateSize(80),
  },
};

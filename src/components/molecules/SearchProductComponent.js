import {isEmpty} from 'lodash';
import React, {useState} from 'react';
import {FlatList, Keyboard, Platform, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {removeDiacritics} from '../../helpers/mcsHelper';
import {Colors, Mixin} from '../../styles';
import {trans} from '../../utils';
import CardItem from './CardItem';

const SearchProductComponent = props => {
  const {data, selectProduct} = props;
  const [isVisible, setIsVisible] = useState(false);

  const renderItem = item => {
    return (
      <CardItem
        item={item}
        onPress={() => {
          selectProduct(item);
          setIsVisible(false);
          Keyboard.dismiss();
        }}
      />
    );
  };

  return (
    <View style={Platform.OS === 'ios' && styles.containerIos}>
      <View style={styles.container}>
        <Searchbar
          {...props}
          placeholder={trans('searchProduct')}
          style={styles.containerSearch}
          inputStyle={styles.input}
          onFocus={() => setIsVisible(true)}
          onBlur={() => setIsVisible(false)}
        />
      </View>
      {isVisible && !isEmpty(data) && (
        <View style={styles.containerListSearch}>
          <FlatList
            data={data}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};
export default SearchProductComponent;

const styles = {
  container: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    alignItems: 'center',
  },
  containerSearch: {
    width: '90%',
    borderRadius: 12,
  },
  containerListSearch: {
    alignSelf: 'center',
    position: 'absolute',
    width: '90%',
    backgroundColor: Colors.WHITE,
    top: 60,
    paddingHorizontal: 12,
    paddingTop: 12,
    height: Mixin.device_height / 2,
    zIndex: 2,
  },
  input: {
    fontStyle: 'italic',
  },
  containerIos: {
    zIndex: 1,
  },
};

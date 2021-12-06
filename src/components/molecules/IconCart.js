import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const IconCart = props => {
  const {number} = props;

  return (
    <TouchableOpacity
      {...props}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
      }}>
      <View style={{padding: 6}}>
        <Ionicons name="cart" size={32} color={Colors.WHITE} />
        {number !== 0 && (
          <View
            style={{
              position: 'absolute',
              top: 6,
              right: 4,
              width: 16,
              aspectRatio: 1 / 1,
              backgroundColor: 'red',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 12, color: 'white', fontWeight: '600'}}>
              {number}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default IconCart;

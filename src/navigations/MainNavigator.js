import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import BottomTabNavigator from './BottomTabNavigator';
import LoginNavigator from './LoginNavigator';

const MainNavigator = () => {
  const store = useSelector(state => state.StoreReducer.store);

  console.log('store', store);

  return (
    <NavigationContainer>
      {store ? <BottomTabNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;

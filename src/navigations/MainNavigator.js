import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {BottomTabNavigator, CompanyNavigator, LoginNavigator} from '.';

const MainNavigator = () => {
  const store = useSelector(state => state.StoreReducer.store);
  const domain = useSelector(state => state.AuthenOverallReducer.domain);

  return (
    <NavigationContainer>
      {store ? <BottomTabNavigator /> : <LoginNavigator />}
      {/* {!domain ? (
        <CompanyNavigator />
      ) : store ? (
        <BottomTabNavigator />
      ) : (
        <LoginNavigator />
      )} */}
    </NavigationContainer>
  );
};

export default MainNavigator;

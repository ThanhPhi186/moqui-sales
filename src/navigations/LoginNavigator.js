import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, ChangeStore} from '../screens';

const Stack = createStackNavigator();
const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: true,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ChangeStore" component={ChangeStore} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;

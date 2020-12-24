import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from 'src/screens/login';
import RegisterScreen from 'src/screens/register';
import StatusBar from 'src/components/status-bar';
import { screenNames } from 'src/constants/Navigation';
import styles, { implicitStyles } from './AuthStackNavigator.styles';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <>
      <StatusBar statusBarProps={implicitStyles.AuthStackNavigator_statusBar} />
      <Stack.Navigator
        headerMode="none"
        initialRouteName={screenNames.login}
        screenOptions={{
          cardStyle: styles.AuthStackNavigator_card,
        }}
      >
        <Stack.Screen name={screenNames.login} component={LoginScreen} />
        <Stack.Screen name={screenNames.register} component={RegisterScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStackNavigator;

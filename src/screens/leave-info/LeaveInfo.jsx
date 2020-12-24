import React from 'react';
import { View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import AppHeader from 'src/components/app-header';
import { screenNames, screenTitles } from 'src/constants/Navigation';
import styles from './LeaveInfo.styles';

const Stack = createStackNavigator();

const LeaveInfo = () => (
  <View>
    <Text>LeaveInfo Screen</Text>
  </View>
);

const LeaveInfoStackNavigator = () => (
  <Stack.Navigator
    headerMode="screen"
    // screenOptions={{
    //   cardStyle: styles.HomeStackNav_card,
    // }}
  >
    <Stack.Screen
      name={screenNames.leaveInfo}
      component={LeaveInfo}
      options={{ header: AppHeader, title: screenTitles.leaveApplication }}
    />
  </Stack.Navigator>
);

export default LeaveInfoStackNavigator;

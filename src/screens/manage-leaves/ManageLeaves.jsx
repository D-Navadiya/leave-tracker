import React from 'react';
import { View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import AppHeader from 'src/components/app-header';
import { screenNames, screenTitles } from 'src/constants/Navigation';
import styles from './ManageLeaves.styles';

const Stack = createStackNavigator();

const ManageLeaves = () => (
  <View>
    <Text>ManageLeaves Screen</Text>
  </View>
);

const ManageLeavesStackNavigator = () => (
  <Stack.Navigator
    headerMode="screen"
    // screenOptions={{
    //   cardStyle: styles.HomeStackNav_card,
    // }}
  >
    <Stack.Screen
      name={screenNames.manageLeaves}
      component={ManageLeaves}
      options={{ header: AppHeader, title: screenTitles.leaveApplication }}
    />
  </Stack.Navigator>
);

export default ManageLeavesStackNavigator;

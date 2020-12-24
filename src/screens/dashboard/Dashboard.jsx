import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

import ViewWrapper from 'src/components/view-wrapper';
import CustomDivider from 'src/components/custom-divider';
import AppHeader from 'src/components/app-header';
import { screenNames, screenTitles } from 'src/constants/Navigation';
import styles from './Dashboard.styles';

const Stack = createStackNavigator();

const InfoView = ({ title, value }) => (
  <View style={styles.Dashboard_infoView}>
    <Text style={styles.Dashboard_titleText}>{title}</Text>
    <Text style={styles.Dashboard_valueText}>{value}</Text>
  </View>
);

const Dashboard = () => (
  <ViewWrapper sn={styles.Dashboard_viewWrapper}>
    <InfoView title="Total Leaves" value="10" />
    <CustomDivider sn={styles.Dashboard_divider} />
    <InfoView title="Applied Leaves" value="10" />
    <CustomDivider sn={styles.Dashboard_divider} />
    <InfoView title="Available Leaves" value="10" />
  </ViewWrapper>
);

const DashboardStackNavigator = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name={screenNames.dashboard}
      component={Dashboard}
      options={{ header: AppHeader, title: screenTitles.dashboard }}
    />
  </Stack.Navigator>
);

export default DashboardStackNavigator;

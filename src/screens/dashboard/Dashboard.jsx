import React, { useContext, useCallback, useState } from 'react';
import { View, BackHandler } from 'react-native';
import { Text } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import ViewWrapper from 'src/components/view-wrapper';
import CustomDivider from 'src/components/custom-divider';
import LoaderViewWrapper from 'src/components/loader-view-wrapper';
import AppHeader from 'src/components/app-header';
import AuthContext from 'src/context/AuthContext';
import { getRemainingLeaveObjById } from 'utils/AsyncStorage';
import { screenNames, screenTitles } from 'src/constants/Navigation';
import { authStorageKeys } from 'src/constants/Authentication';
import { leaveTypeKeys } from 'src/constants/LeaveConstants';
import styles from './Dashboard.styles';

const Stack = createStackNavigator();

const InfoView = ({ title, value }) => (
  <View style={styles.Dashboard_infoView}>
    <Text style={styles.Dashboard_titleText}>{title}</Text>
    <Text style={styles.Dashboard_valueText}>{value}</Text>
  </View>
);

const Dashboard = ({ navigation }) => {
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [remainingLeaveObj, setLeaveObj] = useState({
    [leaveTypeKeys.casual]: 10,
    [leaveTypeKeys.ebl]: 4,
    [leaveTypeKeys.others]: 10,
  });
  const getRemainingLeaveObj = async () => {
    setLoading(true);
    const leaveObj = await getRemainingLeaveObjById(
      userData[authStorageKeys.userId],
    );
    setLeaveObj(leaveObj);
    setLoading(false);
  };
  useFocusEffect(
    useCallback(() => {
      getRemainingLeaveObj();
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  const appliedLeaves =
    10 -
    remainingLeaveObj[leaveTypeKeys.casual] +
    (4 - remainingLeaveObj[leaveTypeKeys.ebl]) +
    (10 - remainingLeaveObj[leaveTypeKeys.others]);
  const availableLeaves =
    remainingLeaveObj[leaveTypeKeys.casual] +
    remainingLeaveObj[leaveTypeKeys.ebl] +
    remainingLeaveObj[leaveTypeKeys.others];
  const totalLeaves = appliedLeaves + availableLeaves;
  return (
    <LoaderViewWrapper loading={loading}>
      <ViewWrapper sn={styles.Dashboard_viewWrapper}>
        <InfoView title="Total Leaves" value={totalLeaves} />
        <CustomDivider sn={styles.Dashboard_divider} />
        <InfoView title="Applied Leaves" value={appliedLeaves} />
        <CustomDivider sn={styles.Dashboard_divider} />
        <InfoView title="Available Leaves" value={availableLeaves} />
      </ViewWrapper>
    </LoaderViewWrapper>
  );
};

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

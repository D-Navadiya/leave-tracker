import React, { useCallback, useState, useContext } from 'react';
import { BackHandler, View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { List, IconButton, Text } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

import CustomDivider from 'src/components/custom-divider';
import AppHeader from 'src/components/app-header';
import AuthContext from 'src/context/AuthContext';
import LoaderViewWrapper from 'src/components/loader-view-wrapper';
import ScreenHeader from 'src/components/screen-header';
import { getLeaveDataByUserId, removeLeaveItem } from 'utils/AsyncStorage';
import {
  screenNames,
  screenTitles,
  navigationParams,
  stackNames,
} from 'src/constants/Navigation';
import { leaveFieldKeys, leaveStorageKeys } from 'src/constants/LeaveConstants';
import { authStorageKeys } from 'src/constants/Authentication';
import { icons } from 'src/constants/GenericConstants';
import { generateTitleStringOfLeave } from 'src/helpers';
import ThemingStore from 'utils/ThemingStore';
import iConstants from './ManageLeaves.constants';
import styles from './ManageLeaves.styles';

const { colors, iconSizes } = ThemingStore.currentTheme;

const Stack = createStackNavigator();

const NoLeavesView = () => (
  <View style={styles.ManageLeaves_noLeavesView}>
    <Text style={styles.ManageLeaves_noLeavesText}>
      {iConstants.noDataAvailableText}
    </Text>
  </View>
);

const ManageLeaves = ({ navigation }) => {
  const { userData } = useContext(AuthContext);
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigateToDashboard = () =>
    navigation.navigate(stackNames.dashboard, {
      screen: screenNames.dashboard,
    });
  const navigateToSpecificEdit = (dataId) => {
    navigation.navigate(stackNames.leaveApplication, {
      screen: screenNames.leaveApplication,
      params: { [navigationParams.leaveDataId]: dataId },
    });
  };

  const getUserLeaveData = async () => {
    setLoading(true);
    const data = await getLeaveDataByUserId(userData[authStorageKeys.userId]);
    setLeaveData(data);
    setLoading(false);
  };

  const onRemoveLeaveItem = async (leaveDateId) => {
    await removeLeaveItem(leaveDateId, getUserLeaveData);
  };

  useFocusEffect(
    useCallback(() => {
      getUserLeaveData();
      const onBackPress = () => {
        navigateToDashboard();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  return (
    <LoaderViewWrapper loading={loading}>
      <ScreenHeader title={iConstants.yourLeaves} />
      {leaveData.length === 0 ? (
        <NoLeavesView />
      ) : (
        <ScrollView>
          <List.Section>
            {leaveData.map((leave) => (
              <React.Fragment key={leave[leaveStorageKeys.leaveDataId]}>
                <List.Item
                  title={generateTitleStringOfLeave(leave)}
                  titleStyle={styles.ManageLeaves_title}
                  description={leave[leaveFieldKeys.reason]}
                  descriptionStyle={styles.ManageLeaves_description}
                  onPress={() =>
                    navigateToSpecificEdit(leave[leaveStorageKeys.leaveDataId])
                  }
                  right={() => (
                    <IconButton
                      icon={icons.deleteCircle}
                      color={colors.danger}
                      style={[styles.ManageLeaves_deleteReminderIcon]}
                      size={iconSizes.huge}
                      onPress={() =>
                        onRemoveLeaveItem(leave[leaveStorageKeys.leaveDataId])
                      }
                    />
                  )}
                />
                <CustomDivider />
              </React.Fragment>
            ))}
          </List.Section>
        </ScrollView>
      )}
    </LoaderViewWrapper>
  );
};

const ManageLeavesStackNavigator = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name={screenNames.manageLeaves}
      component={ManageLeaves}
      options={{ header: AppHeader, title: screenTitles.manageLeaves }}
    />
  </Stack.Navigator>
);

export default ManageLeavesStackNavigator;

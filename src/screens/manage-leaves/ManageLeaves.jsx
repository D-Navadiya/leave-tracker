import React, { useCallback, useState, useContext } from 'react';
import { BackHandler, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { List, IconButton, Text } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import CustomDivider from 'src/components/custom-divider';
import AppHeader from 'src/components/app-header';
import AuthContext from 'src/context/AuthContext';
import LoaderViewWrapper from 'src/components/loader-view-wrapper';
import ViewWrapper from 'src/components/view-wrapper/ViewWrapper';
import { getLeaveDataByUserId, removeLeaveItem } from 'utils/AsyncStorage';
import { screenNames, screenTitles } from 'src/constants/Navigation';
import { authStorageKeys } from 'src/constants/Authentication';
import { generateTitleStringOfLeave } from 'src/helpers';
import { leaveFieldKeys, leaveStorageKeys } from 'src/constants/LeaveConstants';
import ThemingStore from 'utils/ThemingStore';
import styles from './ManageLeaves.styles';

const { colors } = ThemingStore.currentTheme;

const Stack = createStackNavigator();

const NoLeavesView = () => (
  <View style={styles.ManageLeaves_noLeavesView}>
    <Text style={styles.ManageLeaves_noLeavesText}>
      You have not applied for any leaves yet.
    </Text>
  </View>
);

const ManageLeaves = ({ navigation }) => {
  const { userData } = useContext(AuthContext);
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigateToDashboard = () => navigation.navigate(screenNames.dashboard);
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
      {leaveData.length === 0 ? (
        <NoLeavesView />
      ) : (
        <ViewWrapper scrollable>
          <List.Section>
            {leaveData.map((leave) => (
              <React.Fragment key={leave[leaveStorageKeys.leaveDataId]}>
                <List.Item
                  title={generateTitleStringOfLeave(leave)}
                  titleStyle={styles.ManageLeaves_title}
                  description={leave[leaveFieldKeys.reason]}
                  descriptionStyle={styles.ManageLeaves_description}
                  right={() => (
                    <IconButton
                      icon="delete-circle"
                      color={colors.danger}
                      style={[styles.ManageLeaves_deleteReminderIcon]}
                      size={50}
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
        </ViewWrapper>
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

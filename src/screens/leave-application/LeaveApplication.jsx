import React, { useReducer, useContext } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ViewWrapper from 'src/components/view-wrapper';
import leaveApplicationReducer from 'src/reducers/leaveAppliationReducer';
import Button from 'src/components/button';
import { leaveFields } from 'src/constants/LeaveConstants';
import { authStorageKeys } from 'src/constants/Authentication';
import AppHeader from 'src/components/app-header';
import ScreenHeader from 'src/components/screen-header';
import { screenNames, screenTitles } from 'src/constants/Navigation';
import { useFieldGenerator } from 'src/custom-hooks';
import { isSubmissionDisabled } from 'src/helpers';
import AuthContext from 'src/context/AuthContext';
import { storeLeaveData } from 'utils/AsyncStorage';
import styles from './LeaveApplication.styles';
import iConstants from './LeaveApplication.constants';

const Stack = createStackNavigator();

const LeaveApplication = () => {
  const [state, dispatch] = useReducer(
    leaveApplicationReducer,
    iConstants.initialState,
  );
  const { userData } = useContext(AuthContext);
  const onLeaveApplyAction = () =>
    storeLeaveData(userData[authStorageKeys.userId], state);
  const generatedFields = useFieldGenerator(leaveFields, state, dispatch);
  return (
    <>
      <ScreenHeader title="Leave Application" />
      <ViewWrapper sn={styles.LeaveApplication_viewWrapper} scrollable>
        <View style={styles.LeaveApplication_fields}>{generatedFields}</View>
        <Button
          label="Apply"
          action={onLeaveApplyAction}
          labelSn={styles.LeaveApplication_btnLabel}
          disabled={isSubmissionDisabled(leaveFields, state)}
        />
      </ViewWrapper>
    </>
  );
};

const LeaveApplicationStackNavigator = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name={screenNames.leaveApplication}
      component={LeaveApplication}
      options={{ header: AppHeader, title: screenTitles.leaveApplication }}
    />
  </Stack.Navigator>
);

export default LeaveApplicationStackNavigator;

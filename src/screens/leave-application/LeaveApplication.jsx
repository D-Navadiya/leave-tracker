import React, { useReducer, useContext, useCallback, useRef } from 'react';
import { View, BackHandler } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import ViewWrapper from 'src/components/view-wrapper';
import LeaveAppliationReducer from 'src/reducers/LeaveAppliationReducer';
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

const LeaveApplication = ({ navigation }) => {
  const leaveApplicationScrollViewRef = useRef(null);
  const [state, dispatch] = useReducer(
    LeaveAppliationReducer,
    iConstants.initialState,
  );
  const { userData } = useContext(AuthContext);

  const navigateToDashboard = () => navigation.navigate(screenNames.dashboard);

  const onLeaveApplyAction = () =>
    storeLeaveData(
      userData[authStorageKeys.userId],
      state,
      navigateToDashboard,
    );

  const scrollToTop = () =>
    leaveApplicationScrollViewRef.current &&
    leaveApplicationScrollViewRef.current.scrollTo({
      x: 0,
      y: 0,
      animated: false,
    });

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigateToDashboard();
        return true;
      };

      scrollToTop();

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        dispatch({
          type: undefined,
          initialState: iConstants.initialState,
        });
      };
    }, []),
  );
  const generatedFields = useFieldGenerator(leaveFields, state, dispatch);
  const scrollableProps = {
    ref: leaveApplicationScrollViewRef,
  };
  return (
    <>
      <ScreenHeader title={iConstants.leaveApplicationScreenTitleText} />
      <ViewWrapper
        sn={styles.LeaveApplication_viewWrapper}
        scrollableProps={scrollableProps}
        scrollable
      >
        <View style={styles.LeaveApplication_fields}>{generatedFields}</View>
        <Button
          label={iConstants.applyBtnLabel}
          action={onLeaveApplyAction}
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

import React, {
  useReducer,
  useContext,
  useCallback,
  useRef,
  useState,
} from 'react';
import { View, BackHandler } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import ViewWrapper from 'src/components/view-wrapper';
import LoaderViewWrapper from 'src/components/loader-view-wrapper';
import LeaveApplicationReducer from 'src/reducers/LeaveApplicationReducer';
import Button from 'src/components/button';
import { leaveFields } from 'src/constants/LeaveConstants';
import { authStorageKeys } from 'src/constants/Authentication';
import AppHeader from 'src/components/app-header';
import ScreenHeader from 'src/components/screen-header';
import {
  navigationParams,
  screenNames,
  screenTitles,
  stackNames,
} from 'src/constants/Navigation';
import { useFieldGenerator } from 'src/custom-hooks';
import { isSubmissionDisabled } from 'src/helpers';
import AuthContext from 'src/context/AuthContext';
import {
  getSpecificLeaveByLeaveId,
  storeLeaveData,
  updateLeaveItem,
} from 'utils/AsyncStorage';
import styles from './LeaveApplication.styles';
import iConstants from './LeaveApplication.constants';

const Stack = createStackNavigator();

const LeaveApplication = ({ navigation, route: { params } = {} }) => {
  const [loading, setLoading] = useState(true);
  const leaveApplicationScrollViewRef = useRef(null);
  const [state, dispatch] = useReducer(
    LeaveApplicationReducer,
    iConstants.initialState,
  );
  const { userData } = useContext(AuthContext);

  const navigateToDashboard = () =>
    navigation.navigate(stackNames.dashboard, {
      screen: screenNames.dashboard,
    });
  const navigateToManageLeaves = () =>
    navigation.navigate(stackNames.manageLeaves, {
      screen: screenNames.manageLeaves,
    });

  const onApplyLeaveAction = () =>
    params[navigationParams.leaveDataId]
      ? updateLeaveItem(
          params[navigationParams.leaveDataId],
          state,
          navigateToManageLeaves,
        )
      : storeLeaveData(
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

  const fetchAsyncEditItem = async (leaveId) => {
    const editItem = await getSpecificLeaveByLeaveId(leaveId);
    dispatch({ type: 'EDIT_ITEM', editItem });
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigateToDashboard();
        return true;
      };

      scrollToTop();

      if (params[navigationParams.leaveDataId]) {
        setLoading(true);
        fetchAsyncEditItem(params[navigationParams.leaveDataId]);
      } else {
        setLoading(false);
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        navigation.setParams({ [navigationParams.leaveDataId]: null });
        dispatch({
          type: undefined,
          initialState: iConstants.initialState,
        });
      };
    }, [params[navigationParams.leaveDataId]]),
  );
  const generatedFields = useFieldGenerator(leaveFields, state, dispatch);
  const scrollableProps = {
    ref: leaveApplicationScrollViewRef,
  };
  return (
    <LoaderViewWrapper loading={loading}>
      <ScreenHeader title={iConstants.leaveApplicationScreenTitleText} />
      <ViewWrapper
        sn={styles.LeaveApplication_viewWrapper}
        scrollableProps={scrollableProps}
        scrollable
      >
        <View style={styles.LeaveApplication_fields}>{generatedFields}</View>
        <Button
          label={iConstants.applyBtnLabel}
          action={onApplyLeaveAction}
          disabled={isSubmissionDisabled(leaveFields, state)}
        />
      </ViewWrapper>
    </LoaderViewWrapper>
  );
};

const LeaveApplicationStackNavigator = () => (
  <Stack.Navigator headerMode="screen">
    <Stack.Screen
      name={screenNames.leaveApplication}
      component={LeaveApplication}
      options={{ header: AppHeader, title: screenTitles.leaveApplication }}
      initialParams={{
        [navigationParams.leaveDataId]: null,
      }}
    />
  </Stack.Navigator>
);

export default LeaveApplicationStackNavigator;

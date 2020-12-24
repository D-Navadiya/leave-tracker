import { StyleSheet } from 'react-native';
import merge from 'lodash/merge';
import { generalConsts } from 'src/constants/GenericConstants';
import { leaveFieldKeys } from 'src/constants/LeaveConstants';

export const styleCreator = (styles) => StyleSheet.create(styles);

// to merge react-native-paper and react-navigation themes
// and include/overwrite custom theme
export const themeMerger = (
  paperThemeObj,
  navigationThemeObj,
  customThemeObj,
) => merge(paperThemeObj, navigationThemeObj, customThemeObj);

export const convertHexToRgbA = (hex, opacity) => {
  const hexString = hex.replace('#', '');
  const r = parseInt(hexString.substring(0, 2), 16);
  const g = parseInt(hexString.substring(2, 4), 16);
  const b = parseInt(hexString.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

export const regExpTest = (regExp, value) => {
  let hasError = false;
  if (regExp) {
    hasError = !regExp.test(value);
  }
  return hasError;
};

export const isSubmissionDisabled = (prefixedFields, state) =>
  prefixedFields.some(
    (field) =>
      state[field.key] === generalConsts.emptyString || state[field.errorKey],
  );

export const extractStorageKeysOnly = (configuredFields, exceptionArray = []) =>
  configuredFields
    .map((field) => field.key)
    .filter((key) => !exceptionArray.includes(key));

export const checkLeaveInterference = (userLeave, state) => {
  const userLeaveStartISODate = userLeave[leaveFieldKeys.startDate];
  const userLeaveEndISODate = userLeave[leaveFieldKeys.endDate];
  const stateStartISODate = state[leaveFieldKeys.startDate];
  const stateEndISODate = state[leaveFieldKeys.endDate];
  const userLeaveStartDate = new Date(userLeaveStartISODate).getTime();
  const userLeaveEndDate = new Date(userLeaveEndISODate).getTime();
  const stateStartDate = new Date(stateStartISODate).getTime();
  const stateEndDate = new Date(stateEndISODate).getTime();
  return (
    userLeaveStartDate < stateStartDate > userLeaveEndDate ||
    userLeaveStartDate < stateEndDate > userLeaveEndDate ||
    userLeaveStartDate === stateStartDate ||
    userLeaveStartDate === stateEndDate ||
    userLeaveEndDate === stateStartDate ||
    userLeaveEndDate === stateEndDate
  );
};

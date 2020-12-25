import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import pick from 'lodash/pick';
import {
  registerFields,
  authStorageKeys,
  fieldKeys,
} from 'src/constants/Authentication';
import { generalConsts } from 'src/constants/GenericConstants';
import {
  leaveFieldKeys,
  leaveStorageKeys,
  leaveTypeKeys,
} from 'src/constants/LeaveConstants';
import { useAlert } from 'src/custom-hooks';
import {
  extractStorageKeysOnly,
  checkLeaveInterference,
  consumedLeaveReducer,
  calculateLeaveDays,
  sortLeaveDataToEarliestUpcoming,
} from 'src/helpers';

const authenticateBeforeRegistration = (users, state) => {
  try {
    const usernameAlreadyExist = users.some(
      (user) => user[fieldKeys.username] === state[fieldKeys.username],
    );
    if (usernameAlreadyExist) {
      throw { code: 'username_exist' };
    }
    const emailAlreadyExist = users.some(
      (user) => user[fieldKeys.email] === state[fieldKeys.email],
    );
    if (emailAlreadyExist) {
      throw { code: 'email_exist' };
    }
    return true;
  } catch (e) {
    let alertMsg = '';
    if (e.code === 'username_exist') {
      alertMsg = 'Username already exist, try a new one.';
    } else if (e.code === 'email_exist') {
      alertMsg = 'This email address is already in use, try a different one.';
    }
    useAlert(undefined, alertMsg);
    return false;
  }
};

const processRegistrationUserData = (registeredUsers, state) => {
  const registerFieldKeysException = [fieldKeys.confirmPassword];
  const processedUserData = pick(
    state,
    extractStorageKeysOnly(registerFields, registerFieldKeysException),
  );
  processedUserData[authStorageKeys.timestamp] = new Date().getTime();
  processedUserData[authStorageKeys.userId] = registeredUsers.length + 1;
  registeredUsers.push(processedUserData);
  return registeredUsers;
};

export const registerUser = async (state, navigateToLogin) => {
  const { setItem, getItem } = useAsyncStorage(authStorageKeys.registeredUsers);
  let registeredUsers = (await getItem()) ?? generalConsts.emptyArrayString;
  registeredUsers = JSON.parse(registeredUsers);
  const passed = authenticateBeforeRegistration(registeredUsers, state);
  if (!passed) {
    return false;
  }
  const processedData = processRegistrationUserData(registeredUsers, state);
  await setItem(JSON.stringify(processedData));
  navigateToLogin();
  return true;
};

export const loginUser = async (state, changeLoggedIn) => {
  const { setItem: setCurrentLoggedInUser } = useAsyncStorage(
    authStorageKeys.currentLoggedInUser,
  );
  const { getItem: getRegisteredUsers } = useAsyncStorage(
    authStorageKeys.registeredUsers,
  );
  let registeredUsers =
    (await getRegisteredUsers()) ?? generalConsts.emptyArrayString;
  registeredUsers = JSON.parse(registeredUsers);
  const loginPassedUserData = registeredUsers.find(
    (userData) =>
      userData[fieldKeys.username] === state[fieldKeys.username] &&
      userData[fieldKeys.password] === state[fieldKeys.password],
  );
  if (loginPassedUserData) {
    await setCurrentLoggedInUser(JSON.stringify(loginPassedUserData));
    changeLoggedIn(true);
    return true;
  }
  const loginErrorMsg = 'Wrong credentials.';
  useAlert(undefined, loginErrorMsg);
  return false;
};

export const getCurrentLoggedInUser = async () => {
  const { getItem } = useAsyncStorage(authStorageKeys.currentLoggedInUser);
  const currentLoggedInUserData = await getItem();
  return JSON.parse(currentLoggedInUserData);
};

const authenticateBeforeStoringLeaveData = async (userId, state) => {
  try {
    const userLeaveData = await getLeaveDataByUserId(userId);
    if (userLeaveData.length === 0) {
      return true;
    }
    const interferedLeave = userLeaveData.some((userLeave) =>
      checkLeaveInterference(userLeave, state),
    );
    if (interferedLeave) {
      throw { code: 'interfered_leave' };
    }
    const remainingLeaveObj = await getRemainingLeaveObj(userLeaveData);
    const currentTypeRemainingLeaves =
      remainingLeaveObj[state[leaveFieldKeys.leaveType]];
    const stateLeaveDays = calculateLeaveDays(
      state[leaveFieldKeys.startDate],
      state[leaveFieldKeys.endDate],
    );
    if (currentTypeRemainingLeaves <= 0) {
      throw { code: 'consumed_all', data: state[leaveFieldKeys.leaveType] };
    } else if (currentTypeRemainingLeaves - stateLeaveDays <= 0) {
      throw { code: 'leave_exceed', data: state[leaveFieldKeys.leaveType] };
    }

    return true;
  } catch (e) {
    let alertMsg = '';
    if (e.code === 'interfered_leave') {
      alertMsg = 'Leave has already been taken for this date range.';
    } else if (e.code === 'consumed_all') {
      alertMsg = `You have consumed all of your ${e.data} leaves.`;
    } else if (e.code === 'leave_exceed') {
      alertMsg = `Specified number of the ${e.data} leaves exceeds the number of allowed ${e.data} leaves.`;
    }
    useAlert(undefined, alertMsg);
    return false;
  }
};

export const storeLeaveData = async (userId, state, navigateFn) => {
  const passed = await authenticateBeforeStoringLeaveData(userId, state);
  if (!passed) {
    return false;
  }
  const { getItem, setItem } = useAsyncStorage(leaveStorageKeys.leaveData);
  let storedLeaveData = (await getItem()) ?? generalConsts.emptyArrayString;
  storedLeaveData = JSON.parse(storedLeaveData);
  const newLeaveData = {
    ...state,
    [authStorageKeys.userId]: userId,
    [leaveStorageKeys.leaveDataId]: storedLeaveData.length + 1,
  };
  delete newLeaveData[leaveFieldKeys.minimumEndDate];
  storedLeaveData.push(newLeaveData);
  await setItem(JSON.stringify(storedLeaveData));
  navigateFn();
  return true;
};

export const getLeaveDataByUserId = async (userId) => {
  const { getItem } = useAsyncStorage(leaveStorageKeys.leaveData);
  let storedLeaveData = (await getItem()) ?? generalConsts.emptyArrayString;
  storedLeaveData = JSON.parse(storedLeaveData);
  return sortLeaveDataToEarliestUpcoming(
    storedLeaveData.filter((leave) => leave[authStorageKeys.userId] === userId),
  );
};

const getRemainingLeaveObj = async (userLeaveData) => {
  const remainingLeaveObj = {
    [leaveTypeKeys.casual]: 10,
    [leaveTypeKeys.ebl]: 4,
    [leaveTypeKeys.others]: 10,
  };
  if (userLeaveData.length === 0) {
    return remainingLeaveObj;
  }
  const consumedCasualLeave = userLeaveData.reduce(
    (acc, userLeave) =>
      consumedLeaveReducer(acc, userLeave, leaveTypeKeys.casual),
    0,
  );
  const consumedEblLeave = userLeaveData.reduce(
    (acc, userLeave) => consumedLeaveReducer(acc, userLeave, leaveTypeKeys.ebl),
    0,
  );
  const consumedOtherLeave = userLeaveData.reduce(
    (acc, userLeave) =>
      consumedLeaveReducer(acc, userLeave, leaveTypeKeys.others),
    0,
  );
  const remainingCasualLeave =
    remainingLeaveObj[leaveTypeKeys.casual] - consumedCasualLeave;
  const remainingEblLeave =
    remainingLeaveObj[leaveTypeKeys.ebl] - consumedEblLeave;
  const remainingOtherLeave =
    remainingLeaveObj[leaveTypeKeys.others] - consumedOtherLeave;

  return {
    ...remainingLeaveObj,
    [leaveTypeKeys.casual]: remainingCasualLeave,
    [leaveTypeKeys.ebl]: remainingEblLeave,
    [leaveTypeKeys.others]: remainingOtherLeave,
  };
};

export const getRemainingLeaveObjById = async (userId) => {
  const userData = await getLeaveDataByUserId(userId);
  const remainingLeaveObj = await getRemainingLeaveObj(userData);
  return remainingLeaveObj;
};

export const logoutUser = async (changeLoggedIn) => {
  const { setItem } = useAsyncStorage(authStorageKeys.currentLoggedInUser);
  await setItem(generalConsts.emptyObjString);
  changeLoggedIn(false);
  return true;
};

export const removeLeaveItem = async (leaveDataId, refetchFn) => {
  const { setItem, getItem } = useAsyncStorage(leaveStorageKeys.leaveData);
  const leaveItems = JSON.parse(await getItem());
  const updatedLeaveItems = leaveItems.filter(
    (leave) => leave[leaveStorageKeys.leaveDataId] !== leaveDataId,
  );
  await setItem(JSON.stringify(updatedLeaveItems));
  refetchFn();
};

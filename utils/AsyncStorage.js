import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import pick from 'lodash/pick';
import {
  registerFields,
  authStorageKeys,
  fieldKeys,
} from 'src/constants/Authentication';
import { generalConsts } from 'src/constants/GenericConstants';
import { leaveFieldKeys, leaveStorageKeys } from 'src/constants/LeaveConstants';
import { useAlert } from 'src/custom-hooks';
import { extractStorageKeysOnly, checkLeaveInterference } from 'src/helpers';

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
    return true;
  } catch (e) {
    let alertMsg = '';
    if (e.code === 'interfered_leave') {
      alertMsg = 'Leave has already been taken for this date range.';
    }
    useAlert(undefined, alertMsg);
    return false;
  }
};

export const storeLeaveData = async (userId, state) => {
  const passed = authenticateBeforeStoringLeaveData(userId, state);
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
  return true;
};

export const getLeaveDataByUserId = async (userId) => {
  const { getItem } = useAsyncStorage(leaveStorageKeys.leaveData);
  let storedLeaveData = (await getItem()) ?? generalConsts.emptyArrayString;
  storedLeaveData = JSON.parse(storedLeaveData);
  return storedLeaveData.filter(
    (leave) => leave[authStorageKeys.userId] === userId,
  );
};

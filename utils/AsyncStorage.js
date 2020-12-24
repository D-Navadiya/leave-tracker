import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import pick from 'lodash/pick';
import {
  registerFields,
  authStorageKeys,
  fieldKeys,
  otherAuthKeys,
} from 'src/constants/Authentication';
import { generalConsts } from 'src/constants/GenericConstants';
import { leaveStorageKeys } from 'src/constants/LeaveConstants';
import { useAlert } from 'src/custom-hooks';
import { extractStorageKeysOnly } from 'src/helpers';

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
  processedUserData[otherAuthKeys.timestamp] = new Date().getTime();
  processedUserData[otherAuthKeys.id] = registeredUsers.length + 1;
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

export const storeLeaveData = async (userDataId, state) => {
  const { getItem, setItem } = useAsyncStorage(leaveStorageKeys.leaveData);
  const newLeaveData = { ...state, [otherAuthKeys.id]: userDataId };
  let storedLeaveData = (await getItem()) ?? generalConsts.emptyArrayString;
  storedLeaveData = JSON.parse(storedLeaveData);
  storedLeaveData.push(newLeaveData);
  await setItem(JSON.stringify(storedLeaveData));
};

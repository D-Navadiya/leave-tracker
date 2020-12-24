export const authContextValue = Object.freeze({
  loggedIn: false,
  changeLoggedIn: () => {},
  userData: {},
});

export const authStorageKeys = Object.freeze({
  registeredUsers: 'registered_users',
  currentLoggedInUser: 'current_logged_in_user',
  userId: 'user_id',
  timestamp: 'timestamp',
});

export const fieldKeys = Object.freeze({
  firstName: 'first_name',
  firstNameError: 'first_name_error',
  lastName: 'last_name',
  lastNameError: 'last_name_error',
  username: 'username',
  usernameError: 'username_error',
  email: 'email',
  emailError: 'email_error',
  password: 'password',
  passwordError: 'password_error',
  confirmPassword: 'confirm_password',
  confirmPasswordError: 'confirm_password_error',
  companyName: 'company_name',
  companyNameError: 'company_name_error',
});

export const fieldLabels = Object.freeze({
  [fieldKeys.firstName]: 'First Name',
  [fieldKeys.lastName]: 'Last Name',
  [fieldKeys.username]: 'Username',
  [fieldKeys.email]: 'Email',
  [fieldKeys.password]: 'Password',
  [fieldKeys.confirmPassword]: 'Confirm Password',
  [fieldKeys.companyName]: 'Company Name',
});

const fieldConfigs = Object.freeze({
  [fieldKeys.firstName]: {
    key: fieldKeys.firstName,
    label: fieldLabels[fieldKeys.firstName],
    errorKey: fieldKeys.firstNameError,
    errorMsg: 'Please enter a valid name.',
    regExp: /^[a-zA-Z0-9]+$/,
    fieldType: 'input',
  },
  [fieldKeys.lastName]: {
    key: fieldKeys.lastName,
    label: fieldLabels[fieldKeys.lastName],
    errorKey: fieldKeys.lastNameError,
    errorMsg: 'Please enter a valid name.',
    regExp: /^[a-zA-Z0-9]+$/,
    fieldType: 'input',
  },
  [fieldKeys.username]: {
    key: fieldKeys.username,
    label: fieldLabels[fieldKeys.username],
    errorKey: fieldKeys.usernameError,
    errorMsg: 'Please enter a valid username.',
    regExp: /^[a-zA-Z0-9]+$/,
    fieldProps: {
      textContentType: 'username',
    },
    fieldType: 'input',
  },
  [fieldKeys.email]: {
    key: fieldKeys.email,
    label: fieldLabels[fieldKeys.email],
    errorKey: fieldKeys.emailError,
    errorMsg: 'Please enter a valid email address.',
    regExp: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    fieldProps: {
      textContentType: 'emailAddress',
    },
    fieldType: 'input',
  },
  [fieldKeys.password]: {
    key: fieldKeys.password,
    label: fieldLabels[fieldKeys.password],
    errorKey: fieldKeys.passwordError,
    errorMsg:
      'Password must contain at least eight characters, one letter, one number and one special character',
    regExp: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    fieldProps: {
      autoCompleteType: 'password',
      secureTextEntry: true,
      textContentType: 'password',
    },
    fieldType: 'input',
  },
  loginPassword: {
    key: fieldKeys.password,
    label: fieldLabels[fieldKeys.password],
    fieldProps: {
      autoCompleteType: 'password',
      secureTextEntry: true,
      textContentType: 'password',
    },
    fieldType: 'input',
  },
  [fieldKeys.confirmPassword]: {
    key: fieldKeys.confirmPassword,
    label: fieldLabels[fieldKeys.confirmPassword],
    errorKey: fieldKeys.confirmPasswordError,
    errorMsg: 'Password does not match.',
    fieldProps: {
      autoCompleteType: 'password',
      secureTextEntry: true,
      textContentType: 'password',
    },
    fieldType: 'input',
  },
  [fieldKeys.companyName]: {
    key: fieldKeys.companyName,
    label: fieldLabels[fieldKeys.companyName],
    fieldType: 'input',
  },
});

export const loginFields = Object.freeze([
  fieldConfigs[fieldKeys.username],
  fieldConfigs.loginPassword,
]);

export const registerFields = Object.freeze([
  fieldConfigs[fieldKeys.firstName],
  fieldConfigs[fieldKeys.lastName],
  fieldConfigs[fieldKeys.username],
  fieldConfigs[fieldKeys.email],
  fieldConfigs[fieldKeys.password],
  fieldConfigs[fieldKeys.confirmPassword],
  fieldConfigs[fieldKeys.companyName],
]);

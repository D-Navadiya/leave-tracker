import { fieldKeys } from 'src/constants/Authentication';

export default Object.freeze({
  initialState: {
    [fieldKeys.firstName]: '',
    [fieldKeys.firstNameError]: false,
    [fieldKeys.lastName]: '',
    [fieldKeys.lastNameError]: false,
    [fieldKeys.username]: '',
    [fieldKeys.usernameError]: false,
    [fieldKeys.email]: '',
    [fieldKeys.emailError]: false,
    [fieldKeys.password]: '',
    [fieldKeys.passwordError]: false,
    [fieldKeys.confirmPassword]: '',
    [fieldKeys.confirmPasswordError]: false,
    [fieldKeys.companyName]: '',
    [fieldKeys.companyNameError]: false,
  },
  registerBtnText: 'Register',
});

import { fieldKeys } from 'src/constants/Authentication';

export default Object.freeze({
  initialState: {
    [fieldKeys.username]: '',
    [fieldKeys.usernameError]: false,
    [fieldKeys.password]: '',
    [fieldKeys.passwordError]: false,
  },
  loginBtnText: 'Login',
});

import { fieldKeys } from 'src/constants/Authentication';
import { regExpTest } from 'src/helpers';

export default (state, action) => {
  const { type, fieldValue, regExp } = action;
  switch (type) {
    case fieldKeys.firstName:
      return {
        ...state,
        [fieldKeys.firstName]: fieldValue,
        [fieldKeys.firstNameError]: regExpTest(regExp, fieldValue),
      };
    case fieldKeys.lastName:
      return {
        ...state,
        [fieldKeys.lastName]: fieldValue,
        [fieldKeys.lastNameError]: regExpTest(regExp, fieldValue),
      };
    case fieldKeys.username:
      return {
        ...state,
        [fieldKeys.username]: fieldValue,
        [fieldKeys.usernameError]: regExpTest(regExp, fieldValue),
      };
    case fieldKeys.email:
      return {
        ...state,
        [fieldKeys.email]: fieldValue,
        [fieldKeys.emailError]: regExpTest(regExp, fieldValue),
      };
    case fieldKeys.password:
      return {
        ...state,
        [fieldKeys.password]: fieldValue,
        [fieldKeys.passwordError]: regExpTest(regExp, fieldValue),
      };
    case fieldKeys.confirmPassword:
      return {
        ...state,
        [fieldKeys.confirmPassword]: fieldValue,
        [fieldKeys.confirmPasswordError]:
          state[fieldKeys.password] !== fieldValue,
      };
    case fieldKeys.companyName:
      return {
        ...state,
        [fieldKeys.companyName]: fieldValue,
        [fieldKeys.companyNameError]: regExpTest(regExp, fieldValue),
      };
    default:
      return state;
  }
};

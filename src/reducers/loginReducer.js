import { fieldKeys } from 'src/constants/Authentication';
import { regExpTest } from 'src/helpers';

export default (state, action) => {
  const { type, fieldValue, regExp } = action;
  switch (type) {
    case fieldKeys.username:
      return {
        ...state,
        [fieldKeys.username]: fieldValue,
        [fieldKeys.usernameError]: regExpTest(regExp, fieldValue),
      };
    case fieldKeys.password:
      return {
        ...state,
        [fieldKeys.password]: fieldValue,
        [fieldKeys.passwordError]: regExpTest(regExp, fieldValue),
      };
    default:
      return state;
  }
};

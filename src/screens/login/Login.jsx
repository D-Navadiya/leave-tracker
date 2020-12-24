import React, { useReducer, useContext } from 'react';
import { View } from 'react-native';

import AuthViewWrapperHoc from 'src/hoc/auth-screen-wrapper';
import { isSubmissionDisabled } from 'src/helpers';
import Button from 'src/components/button';
import loginReducer from 'src/reducers/loginReducer';
import AuthContext from 'src/context/AuthContext';
import { loginFields } from 'src/constants/Authentication';
import { useFieldGenerator } from 'src/custom-hooks';
import { loginUser } from 'utils/AsyncStorage';
import iConstants from './Login.constants';
import styles from './Login.styles';

const Login = ({ navigation, route }) => {
  const [state, dispatch] = useReducer(loginReducer, iConstants.initialState);
  const generatedFields = useFieldGenerator(loginFields, state, dispatch);
  const { changeLoggedIn } = useContext(AuthContext);
  const onLoginAction = () => loginUser(state, changeLoggedIn);
  return (
    <AuthViewWrapperHoc navigation={navigation} route={route}>
      <View style={styles.Login_loginFormWrapper}>
        <View style={styles.Login_inputFieldsWrapper}>{generatedFields}</View>
        <Button
          label={iConstants.loginBtnText}
          action={onLoginAction}
          labelSn={styles.Login_btnLabel}
          disabled={isSubmissionDisabled(loginFields, state)}
        />
      </View>
    </AuthViewWrapperHoc>
  );
};

export default Login;

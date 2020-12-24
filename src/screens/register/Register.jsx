import React, { useReducer } from 'react';
import { View } from 'react-native';

import AuthViewWrapperHoc from 'src/hoc/auth-screen-wrapper';
import Button from 'src/components/button';
import registerReducer from 'src/reducers/registerReducer';
import { registerFields } from 'src/constants/Authentication';
import { useFieldGenerator } from 'src/custom-hooks';
import { registerUser } from 'utils/AsyncStorage';
import { isSubmissionDisabled } from 'src/helpers';
import { screenNames } from 'src/constants/Navigation';
import iConstants from './Register.constants';
import styles from './Register.styles';

const Register = ({ navigation, route }) => {
  const [state, dispatch] = useReducer(
    registerReducer,
    iConstants.initialState,
  );
  const navigateToLogin = () => navigation.navigate(screenNames.login);
  const onRegisterAction = () => registerUser(state, navigateToLogin);
  const generatedFields = useFieldGenerator(registerFields, state, dispatch);
  return (
    <AuthViewWrapperHoc navigation={navigation} route={route}>
      <View style={styles.Register_formWrapper}>
        <View style={styles.Register_inputFieldsWrapper}>
          {generatedFields}
        </View>
        <Button
          label={iConstants.registerBtnText}
          labelSn={styles.Register_btnLabel}
          action={onRegisterAction}
          disabled={isSubmissionDisabled(registerFields, state)}
        />
      </View>
    </AuthViewWrapperHoc>
  );
};

export default Register;

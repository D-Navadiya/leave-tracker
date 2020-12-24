import React, { useContext } from 'react';

import AuthContext from 'src/context/AuthContext';
import MainDrawerNavigator from './main-drawer-navigator';
import AuthStackNavigator from './auth-stack-navigator';

export default () => {
  const authentication = useContext(AuthContext);
  return (
    <>
      {authentication.loggedIn ? (
        <MainDrawerNavigator />
      ) : (
        <AuthStackNavigator />
      )}
    </>
  );
};

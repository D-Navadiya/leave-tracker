import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import isEmpty from 'lodash/isEmpty';

import { getCurrentLoggedInUser } from 'utils/AsyncStorage';
import ThemingStore from 'utils/ThemingStore';
import AuthContext from 'src/context/AuthContext';
import Navigation from 'src/navigators';

const commonProps = {
  theme: ThemingStore.currentTheme,
};

const App = () => {
  const changeLoggedIn = (value) => {
    setAuth((prevState) => ({ ...prevState, loggedIn: value }));
  };
  const authContextValue = { loggedIn: false, changeLoggedIn, userData: {} };
  const [auth, setAuth] = useState(authContextValue);

  const getLoggedIn = async () => {
    const userData = await getCurrentLoggedInUser();
    if (!isEmpty(userData)) {
      setAuth((prevState) => ({ ...prevState, userData }));
      auth.changeLoggedIn(true);
    }

    SplashScreen.hide();
  };

  useEffect(() => {
    getLoggedIn();
  }, [auth.loggedIn]);

  return (
    <PaperProvider {...commonProps}>
      <AuthContext.Provider value={auth}>
        <NavigationContainer {...commonProps}>
          <Navigation />
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;

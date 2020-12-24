import React from 'react';
import { Image, View } from 'react-native';
import { Text } from 'react-native-paper';

import ViewWrapper from 'src/components/view-wrapper';
import { screenNames } from 'src/constants/Navigation';
import images from 'assets/images';
import styles from './AuthScreenWrapper.styles';
import iConstants from './AuthScreenWrapper.constants';

const RegLoginNavigationText = ({ sn, children, ...props }) => (
  <Text
    style={[styles.AuthWrapper_regLoginNavigationText, sn && sn]}
    {...props}
  >
    {children}
  </Text>
);

const AuthScreenWrapper = ({ children, navigation, route }) => {
  const currentScreenName = route.name;
  const isLoginScreen = currentScreenName === screenNames.login;
  const isRegisterScreen = currentScreenName === screenNames.register;
  const regLoginNavHandler = () =>
    navigation?.navigate(
      isLoginScreen ? screenNames.register : screenNames.login,
    );
  return (
    <ViewWrapper
      sn={[
        styles.AuthWrapper_container,
        isLoginScreen && styles.AuthWrapper_flexedContainer,
      ]}
      scrollable={isRegisterScreen}
    >
      <View style={styles.AuthWrapper_logoWrapper}>
        <Image
          resizeMode="contain"
          source={images.LogoWithText}
          style={[
            styles.AuthWrapper_logo,
            isLoginScreen && styles.AuthWrapper_enlargedLogo,
          ]}
        />
      </View>
      {children}
      <View style={styles.AuthWrapper_regLoginNavigation}>
        <RegLoginNavigationText>
          {(isLoginScreen && iConstants.loginNavigationText) ||
            (isRegisterScreen && iConstants.registrationNavigationText)}
        </RegLoginNavigationText>
        <RegLoginNavigationText
          sn={styles.AuthWrapper_regLoginNavLink}
          onPress={regLoginNavHandler}
        >
          {(isLoginScreen && iConstants.loginNavigationLinkText) ||
            (isRegisterScreen && iConstants.registrationNavigationLinkText)}
        </RegLoginNavigationText>
      </View>
    </ViewWrapper>
  );
};

export default AuthScreenWrapper;

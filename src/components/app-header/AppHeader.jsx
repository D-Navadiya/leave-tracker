import React from 'react';
import { Appbar } from 'react-native-paper';
import { Image } from 'react-native';

import { screenNames, stackNames } from 'src/constants/Navigation';
import { icons } from 'src/constants/GenericConstants';
import images from 'assets/images';
import ThemingStore from 'utils/ThemingStore';
import styles from './AppHeader.styles';

const { colors, iconSizes } = ThemingStore.currentTheme;

const AppHeader = ({ scene, navigation }) => {
  const { options } = scene.descriptor;
  const { name: routeName } = scene.route;
  const headerTitle = options.title || '';
  const isDashboard = routeName === screenNames.dashboard;
  const openDrawer = () => navigation.openDrawer();
  const navigateToDashboard = () =>
    navigation.navigate(stackNames.dashboard, {
      screen: screenNames.dashboard,
    });
  const goBack = () => navigation.goBack();

  return (
    <Appbar.Header
      style={[
        styles.AppHeader,
        isDashboard && styles.AppHeader_dashboardScreen,
      ]}
    >
      {isDashboard ? (
        <Appbar.Action
          icon={icons.menu}
          onPress={openDrawer}
          size={iconSizes.small}
          color={colors.textAccent}
        />
      ) : (
        <Appbar.Action
          icon={icons.arrowLeft}
          onPress={goBack}
          size={iconSizes.small}
          color={colors.textAccent}
        />
      )}
      {!isDashboard && (
        <Appbar.Content
          title={headerTitle}
          titleStyle={styles.AppHeader_title}
        />
      )}
      {isDashboard && (
        <Image
          source={images.TextLogo}
          resizeMode="contain"
          style={styles.AppHeader_imageLogo}
        />
      )}
      {!isDashboard && (
        <Appbar.Action
          icon={icons.homeOutline}
          size={iconSizes.small}
          onPress={navigateToDashboard}
          color={colors.textAccent}
        />
      )}
    </Appbar.Header>
  );
};

export default AppHeader;

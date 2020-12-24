import React from 'react';
import { Appbar } from 'react-native-paper';
import { Image } from 'react-native';
import { screenNames } from 'src/constants/Navigation';
import images from 'assets/images';
import ThemingStore from 'utils/ThemingStore';
import styles from './AppHeader.styles';
import iConstants from './AppHeader.constants';

const { colors } = ThemingStore.currentTheme;

const AppHeader = ({ scene, navigation }) => {
  const { options } = scene.descriptor;
  const { name: routeName } = scene.route;
  const headerTitle = options.title || '';
  const isDashboard = routeName === screenNames.dashboard;
  const openDrawer = () => navigation.openDrawer();
  const navigateToDashboard = () => navigation.navigate(screenNames.dashboard);
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
          icon="menu"
          onPress={openDrawer}
          size={iConstants.iconSize}
          color={colors.primary}
        />
      ) : (
        <Appbar.Action
          icon="arrow-left"
          onPress={goBack}
          size={iConstants.iconSize}
          color={colors.primary}
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
          icon="home-outline"
          size={iConstants.iconSize}
          onPress={navigateToDashboard}
          color={colors.primary}
        />
      )}
    </Appbar.Header>
  );
};

export default AppHeader;

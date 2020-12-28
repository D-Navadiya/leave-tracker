import React, { useMemo, useContext } from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import AuthContext from 'src/context/AuthContext';
import { fieldKeys } from 'src/constants/Authentication';
import { icons } from 'src/constants/GenericConstants';
import ThemingStore from 'utils/ThemingStore';
import iConstants from './DrawerHeader.constants';
import styles from './DrawerHeader.styles';

const { colors, iconSizes } = ThemingStore.currentTheme;

const DrawerHeader = ({ navigation }) => {
  const { userData } = useContext(AuthContext);
  const closeDrawer = () => {
    navigation.closeDrawer();
  };
  return (
    <View style={styles.DrawerHeader}>
      <IconButton
        icon={icons.close}
        size={iconSizes.small}
        onPress={closeDrawer}
        style={styles.DrawerHeader_closeIcon}
        color={colors.primary}
      />
      <Text style={styles.DrawerHeader_loggedInAsText}>
        {iConstants.loggedInAsText}
      </Text>
      {useMemo(
        () => (
          <>
            <Text style={styles.DrawerHeader_nameText}>{`${
              userData[fieldKeys.firstName]
            } ${userData[fieldKeys.lastName]}`}</Text>
          </>
        ),
        [userData],
      )}
    </View>
  );
};

export default DrawerHeader;

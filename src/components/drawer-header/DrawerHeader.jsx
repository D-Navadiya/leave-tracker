import React, { useMemo, useContext } from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import AuthContext from 'src/context/AuthContext';
import { fieldKeys } from 'src/constants/Authentication';
import ThemingStore from 'utils/ThemingStore';
import styles from './DrawerHeader.styles';
import iConstants from './DrawerHeader.constants';

const { colors } = ThemingStore.currentTheme;

const DrawerHeader = ({ navigation }) => {
  const { userData } = useContext(AuthContext);
  const closeDrawer = () => {
    navigation.closeDrawer();
  };
  return (
    <View style={styles.DrawerHeader}>
      <IconButton
        icon="close"
        size={iConstants.iconSize}
        onPress={closeDrawer}
        style={styles.DrawerHeader_closeIcon}
        color={colors.primary}
      />
      <Text style={styles.DrawerHeader_loggedInAsText}>Logged In as</Text>
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

import React, { useContext } from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import AuthContext from 'src/context/AuthContext';
import { logoutUser } from 'utils/AsyncStorage';
import Button from 'src/components/button';
import DrawerHeader from '../drawer-header';
import styles from './CustomDrawerContent.styles';

const CustomDrawerContent = (props) => {
  const { changeLoggedIn } = useContext(AuthContext);
  const onLogoutAction = () => logoutUser(changeLoggedIn);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerHeader {...props} />
      <DrawerItemList {...props} />
      <Button
        label="Logout"
        action={onLogoutAction}
        sn={styles.CustomDrawerContent_logoutButton}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import DrawerHeader from '../drawer-header';

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <DrawerHeader {...props} />
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

export default CustomDrawerContent;

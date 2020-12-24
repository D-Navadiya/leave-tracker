import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';

import { screenNames, screenTitles } from 'src/constants/Navigation';
import DashboardScreen from 'src/screens/dashboard';
import ManageLeavesScreen from 'src/screens/manage-leaves';
import LeaveInfoScreen from 'src/screens/leave-info';
import LeaveApplicationScreen from 'src/screens/leave-application';
import CustomeDrawerContent from 'src/components/custom-drawer-content';
import ThemingStore from 'utils/ThemingStore';
import iConstants from './MainDrawerNavigator.constants';
import styles from './MainDrawerNavigator.styles';

const Drawer = createDrawerNavigator();

const { colors } = ThemingStore.currentTheme;

const Icon = ({ name, focused }) => (
  <IconButton
    icon={name}
    size={iConstants.iconSize}
    color={focused ? colors.primary : colors.primaryAccent}
    style={[
      styles.DrawerNavigator_drawerIcon,
      !focused && styles.DrawerNavigator_drawerIcon__lowerOpacity,
    ]}
  />
);

const MainDrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName={screenNames.dashboard}
    drawerContent={(props) => <CustomeDrawerContent {...props} />}
    drawerStyle={styles.DrawerNavigator_drawer}
    drawerContentOptions={{
      activeBackgroundColor: colors.drawerItemActiveBg,
      itemStyle: styles.DrawerNavigator_itemStyle,
      labelStyle: styles.DrawerNavigator_labelStyle,
      activeTintColor: colors.secondary,
    }}
  >
    <Drawer.Screen
      name={screenNames.dashboard}
      component={DashboardScreen}
      options={{
        title: screenTitles.dashboard,
        drawerIcon: ({ focused }) => (
          <Icon focused={focused} name="view-dashboard" />
        ),
      }}
    />
    <Drawer.Screen
      name={screenNames.leaveApplication}
      component={LeaveApplicationScreen}
      options={{
        title: screenTitles.leaveApplication,
        drawerIcon: ({ focused }) => (
          <Icon focused={focused} name="application" />
        ),
      }}
    />
    {/* <Drawer.Screen
      name={screenNames.manageLeaves}
      component={ManageLeavesScreen}
      options={{
        title: screenTitles.manageLeaves,
        drawerIcon: ({ focused }) => (
          <Icon focused={focused} name="book-edit" />
        ),
      }}
    />
    <Drawer.Screen
      name={screenNames.leaveInfo}
      component={LeaveInfoScreen}
      options={{
        title: screenTitles.leaveInfo,
        drawerIcon: ({ focused }) => (
          <Icon focused={focused} name="information" />
        ),
      }}
    /> */}
  </Drawer.Navigator>
);

export default MainDrawerNavigator;

import React from 'react';
import { StatusBar } from 'react-native';

import FocusAwareStatusBar from './focus-aware-statusbar';

const ShutterBar = ({ statusBarProps, isFocusAware = false }) =>
  isFocusAware ? (
    <FocusAwareStatusBar {...statusBarProps} />
  ) : (
    <StatusBar {...statusBarProps} />
  );

ShutterBar.defaultProps = {
  statusBarProps: {
    hidden: false,
    // 'default'/'light-content'/'dark-content'
    barStyle: 'default',
    // backgroundColor
  },
};

export default ShutterBar;

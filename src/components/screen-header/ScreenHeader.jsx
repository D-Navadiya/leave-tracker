import React from 'react';
import { Appbar } from 'react-native-paper';

import styles from './ScreenHeader.styles';

const ScreenHeader = ({ title }) => {
  return (
    <Appbar.Header style={styles.ScreenHeader}>
      <Appbar.Content title={title} titleStyle={[styles.ScreenHeader_title]} />
    </Appbar.Header>
  );
};

export default ScreenHeader;

import React from 'react';
import { Divider } from 'react-native-paper';
import styles from './CustomDivider.styles';

const CustomDivider = ({ sn, ...props }) => (
  <Divider style={[styles.CustomDivider, sn && sn]} {...props} />
);

export default CustomDivider;

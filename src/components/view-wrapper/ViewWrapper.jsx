import React from 'react';
import { View, ScrollView } from 'react-native';

import styles from './ViewWrapper.styles';

const ViewWrapper = ({
  children,
  sn,
  scrollable = false,
  scrollableProps = {},
  halfSpaced,
}) =>
  scrollable ? (
    <ScrollView
      contentContainerStyle={[
        styles.ViewWrapper,
        halfSpaced && styles.ViewWrapper_halfSpaced,
        sn && sn,
      ]}
      {...scrollableProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.ViewWrapper,
        halfSpaced && styles.ViewWrapper_halfSpaced,
        styles.ViewWrapper_flexed,
        sn && sn,
      ]}
    >
      {children}
    </View>
  );

export default ViewWrapper;

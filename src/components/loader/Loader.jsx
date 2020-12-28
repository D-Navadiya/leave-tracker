import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

import ThemingStore from 'utils/ThemingStore';
import styles from './Loader.styles';

const { colors, iconSizes } = ThemingStore.currentTheme;

const Loader = ({ loading }) => {
  return (
    <Modal transparent animationType="none" visible={loading}>
      <View style={styles.Loader_modalBackground}>
        <View style={styles.Loader_activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            color={colors.primary}
            size={iconSizes.huge}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

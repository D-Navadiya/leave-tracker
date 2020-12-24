import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import ThemingStore from 'utils/ThemingStore';
import iConstants from './Loader.constants';
import styles from './Loader.styles';

const { colors } = ThemingStore.currentTheme;

const Loader = ({ loading }) => {
  return (
    <Modal transparent animationType="none" visible={loading}>
      <View style={styles.Loader_modalBackground}>
        <View style={styles.Loader_activityIndicatorWrapper}>
          <ActivityIndicator
            animating={loading}
            color={colors.primary}
            size={iConstants.indicatorSize}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

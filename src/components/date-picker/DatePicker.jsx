import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import ThemingStore from 'utils/ThemingStore';
import styles from './DatePicker.styles';

const { colors } = ThemingStore.currentTheme;

const CustomDatePicker = ({
  label,
  value,
  minimumDate = new Date(),
  onDateChange,
}) => {
  return (
    <View style={styles.DatePicker_container}>
      <Text style={styles.DatePicker_label}>{label}</Text>
      <View style={styles.DatePicker_pickerWrapper}>
        <DatePicker
          date={new Date(value)}
          style={styles.DatePicker_picker}
          mode="date"
          textColor={colors.primary}
          fadeToColor={colors.primaryAccent}
          minimumDate={minimumDate}
          onDateChange={onDateChange}
        />
      </View>
    </View>
  );
};

export default CustomDatePicker;

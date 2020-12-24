import React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

import { leaveTypes } from 'src/constants/LeaveConstants';
import ThemingStore from 'utils/ThemingStore';
import styles from './RadioField.styles';

const { colors } = ThemingStore.currentTheme;

const RadioField = ({ value, onChangeHandler, label }) => (
  <View>
    <Text style={styles.RadioField_title}>{label}</Text>
    <RadioButton.Group onValueChange={onChangeHandler} value={value}>
      {leaveTypes.map(({ key, name, count }) => (
        <RadioButton.Item
          label={`${name} (${count})`}
          value={key}
          key={key}
          color={colors.primary}
          labelStyle={styles.RadioField_radioBtnLabel}
        />
      ))}
    </RadioButton.Group>
  </View>
);

export default RadioField;

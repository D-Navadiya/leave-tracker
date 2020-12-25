import React from 'react';
import { View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import ThemingStore from 'utils/ThemingStore';
import styles from './Input.styles';

const { colors } = ThemingStore.currentTheme;

const Input = ({
  onChangeHandler = () => {},
  value = undefined,
  mode = 'outlined',
  label = undefined,
  sn,
  error,
  errorMsg = '',
  extraSpacedWidth,
  ...props
}) => (
  <View style={styles.CustomInput_container}>
    <TextInput
      label={label}
      value={value}
      mode={mode}
      selectionColor={colors.primary}
      underlineColor={colors.primary}
      theme={{ colors: { text: colors.primary } }}
      style={[
        styles.CustomInput_textInput,
        extraSpacedWidth && styles.CustomInput_extraSpacedWidthTextInput,
        sn && sn,
      ]}
      onChangeText={onChangeHandler}
      error={error}
      {...props}
    />
    {error && <Text style={styles.CustomInput_errorText}>{errorMsg}</Text>}
  </View>
);

export default Input;

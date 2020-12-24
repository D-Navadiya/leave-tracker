import React from 'react';
import { View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import styles from './Input.styles';

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

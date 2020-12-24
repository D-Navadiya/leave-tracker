import React from 'react';
import { Button } from 'react-native-paper';
import { buttonConsts } from 'src/constants/GenericConstants';
import styles from './GenericButton.styles';

const GenericButton = ({ type, label, action, sn, labelSn, ...props }) => {
  const isButtonTypeSecondary = type === buttonConsts.secondaryType;
  const isButtonTypePrimaryInverted = type === buttonConsts.primaryInvertedType;
  const isButtonTypeSecondaryInverted =
    type === buttonConsts.secondaryInvertedType;

  const buttonProps = {
    mode: 'contained',
    uppercase: false,
    ...props,
  };
  return (
    <Button
      onPress={action}
      labelStyle={[
        styles.GenericButton_label,
        labelSn && labelSn,
        isButtonTypePrimaryInverted &&
          styles.GenericButton_label__primaryInverted,
        isButtonTypeSecondary && styles.GenericButton_label__secondary,
      ]}
      contentStyle={styles.GenericButton_contentStyle}
      style={[
        styles.GenericButton_button,
        isButtonTypePrimaryInverted &&
          styles.GenericButton_button__primaryInverted,
        isButtonTypeSecondary && styles.GenericButton_button__secondary,
        isButtonTypeSecondaryInverted &&
          styles.GenericButton_button__secondaryInverted,
        sn && sn,
      ]}
      {...buttonProps}
    >
      {label}
    </Button>
  );
};

export default GenericButton;

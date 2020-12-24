import React from 'react';
import { Alert } from 'react-native';
import Input from 'src/components/custom-input';
import RadioField from 'src/components/radio-field';
import CustomDatePicker from 'src/components/date-picker';
import { leaveFieldKeys } from 'src/constants/LeaveConstants';
import { generalConsts } from 'src/constants/GenericConstants';

export const useFieldGenerator = (prefixedFields, state, dispatch) =>
  prefixedFields.map((field) => {
    const {
      key,
      label,
      regExp,
      errorKey,
      errorMsg,
      fieldProps,
      fieldType,
    } = field;

    switch (fieldType) {
      case 'radio': {
        const onChangeHandler = (value) =>
          dispatch({ type: key, fieldValue: value });
        return (
          <RadioField
            key={key}
            value={state[key]}
            label={label}
            onChangeHandler={onChangeHandler}
          />
        );
      }
      case 'date': {
        const onDateChange = (value) =>
          dispatch({ type: key, fieldValue: value });
        return (
          <CustomDatePicker
            label={label}
            key={key}
            value={state[key]}
            onDateChange={onDateChange}
            minimumDate={state[field.minimumDateKey]}
          />
        );
      }
      default: {
        const onChangeHandler = (text) =>
          dispatch({ type: key, fieldValue: text, regExp });
        const hasError =
          state[errorKey] && state[key] !== generalConsts.emptyString;
        return (
          <Input
            label={label}
            key={key}
            value={state[key]}
            onChangeHandler={onChangeHandler}
            error={hasError}
            errorMsg={errorMsg}
            {...fieldProps}
          />
        );
      }
    }
  });

export const useAlert = (title, msg) => {
  Alert.alert(title, msg, [{ text: 'OK', onPress: () => {} }], {
    cancelable: false,
  });
};

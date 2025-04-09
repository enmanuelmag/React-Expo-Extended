import React from 'react';
import CurrencyInput from 'react-native-currency-input';

import InputText from './input-text';
import { TextInput } from 'react-native';

type CurrencyInputProps = {
  symbol?: string;
  error?: string;
  value: number;
  label: string;
  description?: string;
  placeholder: string;
  separator?: string;
  delimiter?: string;
  precision?: number;
  onChange: (value: number) => void;
};

const CurrencyInputCustom = React.forwardRef<TextInput, CurrencyInputProps>(
  (props: CurrencyInputProps, ref) => {
    const {
      delimiter = '.',
      separator = ',',
      precision = 2,
      label,
      placeholder,
      symbol,
      error,
      value = 0,
      onChange,
    } = props;

    return (
      <CurrencyInput
        delimiter={delimiter}
        minValue={0}
        precision={precision}
        prefix={symbol}
        renderTextInput={(textInputProps) => (
          <InputText
            description={props.description}
            error={error}
            keyboardType="numeric"
            label={label}
            placeholder={placeholder}
            ref={ref}
            value={textInputProps.value}
            onChange={(v) => textInputProps.onChangeText?.(v)}
          />
        )}
        separator={separator}
        value={value ?? 0}
        onChangeValue={(v) => onChange(v ?? 0)}
      />
    );
  },
);

export default CurrencyInputCustom;

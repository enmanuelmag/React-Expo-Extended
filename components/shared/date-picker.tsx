/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import moment from 'moment';
import { AnimatePresence, Text, View } from 'tamagui';
import DatePicker from 'react-native-date-picker';

import { FORMAT_TIME_DATE } from '@constants/budget';

import InputText from './input-text';
import { TextInput } from 'react-native';
import { isIOS } from '@utils/platform';

type DatePickerCustomProps = {
  isModal?: boolean;
  disabled?: boolean;
  title?: string;
  value?: number;
  name?: string;
  error?: string;
  cancelText?: string;
  confirmText?: string;
  minimumDate?: number;
  maximumDate?: number;
  mode: 'date' | 'time' | 'datetime';
  onCancel?: () => void;
  onChange?: (date: number) => void;
  onConfirm?: (date: number) => void;
};

const DatePickerCustom = React.forwardRef<TextInput, DatePickerCustomProps>(
  (props: DatePickerCustomProps, ref) => {
    const {
      isModal,
      name,
      title,
      error,
      value,
      cancelText,
      confirmText,
      minimumDate,
      maximumDate,
      mode,
      disabled,
      onCancel,
      onChange,
      onConfirm,
    } = props;

    const [open, setOpen] = React.useState<boolean>(false);

    return (
      <View
        onPress={
          !isIOS
            ? () => {
                if (!disabled) setOpen((prev) => !prev);
              }
            : undefined
        }
      >
        <InputText
          readOnly
          label={title}
          name={name}
          ref={ref}
          value={getValue()}
          onPress={
            isIOS
              ? () => {
                  if (!disabled) setOpen((prev) => !prev);
                }
              : undefined
          }
        />

        <DatePicker
          cancelText={cancelText}
          confirmText={confirmText}
          date={value ? moment.unix(value).toDate() : new Date()}
          maximumDate={maximumDate ? moment.unix(maximumDate).toDate() : undefined}
          minimumDate={minimumDate ? moment.unix(minimumDate).toDate() : undefined}
          modal={isModal}
          mode={mode}
          open={open}
          title={title}
          onCancel={() => {
            onCancel?.();
            setOpen(false);
          }}
          onConfirm={(date) => {
            onConfirm?.(moment(date).unix());
            setOpen(false);
          }}
          onDateChange={(date) => onChange?.(moment(date).unix())}
        />
        <AnimatePresence initial={false}>
          {error && (
            <Text
              animation="quick"
              className="cd-text-red-500 cd-pl-[2]"
              enterStyle={{
                opacity: 0,
                scale: 0.7,
              }}
              exitStyle={{
                opacity: 1,
              }}
            >
              {error}
            </Text>
          )}
        </AnimatePresence>
      </View>
    );

    function getValue() {
      if (mode === 'date') {
        return value
          ? moment.unix(value).format(FORMAT_TIME_DATE)
          : moment().format(FORMAT_TIME_DATE);
      }
      return value ? moment.unix(value).format('HH:mm') : moment().format('HH:mm');
    }
  },
);

export default DatePickerCustom;

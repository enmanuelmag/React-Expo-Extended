/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import { AnimatePresence, Label, Text, Input, YStack } from 'tamagui';
import { KeyboardTypeOptions, TextInput, Keyboard, ReturnKeyTypeOptions } from 'react-native';

import { $ } from '@utils/styles';

import { UI } from '@constants/app';

type InputTextProps = {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  label?: string;
  autoFocus?: boolean;
  description?: string;
  name?: string;
  classes?: string;
  disabled?: boolean | null;
  value?: string | number | null;
  placeholder?: string;
  error?: string;
  isPassword?: boolean;
  readOnly?: boolean | null;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  textContentType?: TextContentType;
  autoComplete?: AutoCompleteType;
  multiline?: boolean;
  numberOfLines?: number;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  onPress?: () => void;
};

const InputText = React.forwardRef<TextInput, InputTextProps>((props: InputTextProps, ref) => {
  const {
    label,
    description,
    classes,
    disabled,
    placeholder,
    error,
    value,
    isPassword,
    onBlur,
    onChange,
    onPress,
    autoFocus,
    autoCapitalize,
    textContentType,
    autoComplete,
    multiline,
    numberOfLines,
    returnKeyType = 'done',
    keyboardType = 'default',
  } = props;

  return (
    <YStack className={$('cd-w-full', classes)} gap="$1.5" onPress={() => null}>
      {label && (
        <Label
          className="cd-font-bold cd-leading-[14px] cd-w-full"
          onPress={() => Keyboard.dismiss()}
        >
          {label}
        </Label>
      )}
      <Input
        autoCapitalize={autoCapitalize ?? 'sentences'}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className="cd-mb-0 cd-pb-0"
        clearButtonMode="while-editing"
        disabled={Boolean(disabled)}
        importantForAutofill={autoComplete ? 'yes' : 'no'}
        keyboardType={keyboardType}
        maskType="luminance"
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        readOnly={Boolean(props.readOnly)}
        ref={ref}
        returnKeyType={returnKeyType}
        secureTextEntry={Boolean(isPassword)}
        size={UI.Size}
        style={
          multiline && {
            textAlignVertical: 'top',
          }
        }
        textContentType={textContentType}
        value={value ? String(value) : ''}
        onBlur={onBlur}
        onChangeText={onChange}
        onPress={onPress}
      />
      {!error && description && (
        <Text
          className="cd-text-gray-500 cd-text dark:cd-text-gray-400
      
      "
        >
          {description}
        </Text>
      )}
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
    </YStack>
  );
});

type AutoCompleteType =
  | 'additional-name'
  | 'address-line1'
  | 'address-line2'
  | 'birthdate-day'
  | 'birthdate-full'
  | 'birthdate-month'
  | 'birthdate-year'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-day'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-middle-name'
  | 'cc-family-name'
  | 'cc-type'
  | 'country'
  | 'current-password'
  | 'email'
  | 'family-name'
  | 'gender'
  | 'given-name'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'name'
  | 'name-family'
  | 'name-given'
  | 'name-middle'
  | 'name-middle-initial'
  | 'name-prefix'
  | 'name-suffix'
  | 'new-password'
  | 'nickname'
  | 'one-time-code'
  | 'organization'
  | 'organization-title'
  | 'password'
  | 'password-new'
  | 'postal-address'
  | 'postal-address-country'
  | 'postal-address-extended'
  | 'postal-address-extended-postal-code'
  | 'postal-address-locality'
  | 'postal-address-region'
  | 'postal-code'
  | 'street-address'
  | 'sms-otp'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-device'
  | 'url'
  | 'username'
  | 'username-new'
  | 'off'
  | undefined;

type TextContentType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'creditCardExpiration'
  | 'creditCardExpirationMonth'
  | 'creditCardExpirationYear'
  | 'creditCardSecurityCode'
  | 'creditCardType'
  | 'creditCardName'
  | 'creditCardGivenName'
  | 'creditCardMiddleName'
  | 'creditCardFamilyName'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode'
  | 'birthdate'
  | 'birthdateDay'
  | 'birthdateMonth'
  | 'birthdateYear'
  | undefined;

export default InputText;

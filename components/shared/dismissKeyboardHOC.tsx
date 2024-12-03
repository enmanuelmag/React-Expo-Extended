/* eslint-disable react-native/no-inline-styles */
import { isIOS } from '@utils/platform';
import React from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { View } from 'tamagui';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  children: React.ReactNode;
};

const DismissKeyboardHOC = ({ children }: Props) => {
  const [keyboardStatus, setKeyboardStatus] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardStatus(true);
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardStatus(false);
      });
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []),
  );

  return (
    <KeyboardAvoidingView
      enabled
      behavior={isIOS ? 'padding' : 'height'}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={isIOS ? 90 : keyboardStatus ? 90 : 0}
      //style={{ flex: 1, height: '100%' }}
    >
      <TouchableWithoutFeedback
        className="cd-w-full"
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View className="cd-w-full">{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default DismissKeyboardHOC;

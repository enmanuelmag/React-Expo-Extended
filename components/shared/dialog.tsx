/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { AlertDialog as AlertTama, Text, XStack, YStack } from 'tamagui';

import { ColorsTheme } from '@constants/Colors';

import ButtonCustom from './button';

type AlertTamaProps = {
  open?: boolean;
  title: string;
  children?: React.ReactNode;
  content: string | React.ReactNode;
  textConfirm: string;
  colorConfirm?: keyof (typeof ColorsTheme)['light'];
  textCancel: string;
  colorCancel?: keyof (typeof ColorsTheme)['light'];
  onConfirm: () => void;
  onCancel: () => void;
  onOpenChange?: (boolean: boolean) => void;
};

export function AlertDialog(props: AlertTamaProps) {
  const {
    open,
    title,
    content,
    textConfirm,
    textCancel,
    children,
    colorCancel,
    colorConfirm,
    onCancel,
    onConfirm,
    onOpenChange,
  } = props;
  return (
    <AlertTama open={open} onOpenChange={onOpenChange}>
      {children && <AlertTama.Trigger asChild>{children}</AlertTama.Trigger>}

      <AlertTama.Portal>
        <AlertTama.Overlay
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          key="overlay"
          opacity={0.5}
        />
        <AlertTama.Content
          bordered
          elevate
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          key="content"
          opacity={1}
          scale={1}
          x={0}
          y={0}
        >
          <YStack gap="$3">
            <AlertTama.Title>
              <Text className="cd-text-lg cd-font-semibold cd-text-gray-800 dark:cd-text-gray-100">
                {title}
              </Text>
            </AlertTama.Title>
            <AlertTama.Description>
              {React.isValidElement(content) ? (
                content
              ) : (
                <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-200">
                  {content}
                </Text>
              )}
            </AlertTama.Description>

            <XStack gap="$3" justifyContent="flex-end">
              <AlertTama.Cancel asChild>
                <ButtonCustom
                  aria-label="Close"
                  color={colorCancel ?? 'red'}
                  text={textCancel}
                  onPress={onCancel}
                />
              </AlertTama.Cancel>
              <AlertTama.Action asChild>
                <ButtonCustom
                  aria-label="Confirm"
                  color={colorConfirm ?? 'green'}
                  text={textConfirm}
                  onPress={onConfirm}
                />
              </AlertTama.Action>
            </XStack>
          </YStack>
        </AlertTama.Content>
      </AlertTama.Portal>
    </AlertTama>
  );
}

export default AlertDialog;

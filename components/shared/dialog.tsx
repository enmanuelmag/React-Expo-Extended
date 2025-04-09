/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { AlertDialog as AlertTama, Text, YStack } from 'tamagui';
import SeparatorCustom from './separator-custom';
import { $ } from '@utils/styles';

type AlertTamaProps = {
  title?: string;
  content: string | React.ReactNode;
  showSeparator?: boolean;
  children?: React.ReactNode;
  open?: boolean;
  width?: number | `${number}%`;
  onOpenChange?: (boolean: boolean) => void;
};

export function AlertDialog(props: AlertTamaProps) {
  const { open, title, content, children, onOpenChange, showSeparator, width } = props;
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
          maxWidth="90%"
          opacity={1}
          scale={1}
          width={width}
          x={0}
          y={0}
        >
          <YStack>
            {title && (
              <AlertTama.Title>
                <Text className="cd-text-lg cd-font-semibold cd-text-gray-800 dark:cd-text-gray-100">
                  {title}
                </Text>
              </AlertTama.Title>
            )}
            {title && showSeparator && <SeparatorCustom classes="cd-mt-[8] cd-mb-[16]" />}
            <AlertTama.Description className={$(!showSeparator && 'cd-mt-[16]')}>
              {React.isValidElement(content) ? (
                content
              ) : (
                <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-200">
                  {content}
                </Text>
              )}
            </AlertTama.Description>
          </YStack>
        </AlertTama.Content>
      </AlertTama.Portal>
    </AlertTama>
  );
}

export default AlertDialog;

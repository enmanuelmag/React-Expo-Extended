/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { X } from '@tamagui/lucide-icons';
import { Adapt, Button, Dialog, Separator, Sheet, Text, Unspaced, XStack } from 'tamagui';

import ButtonCustom, { colorsStyles } from './button';

type ConfirmEventProps = {
  title: string;
  content: string | React.ReactNode;
  children: React.ReactNode;
  confirmColor?: keyof typeof colorsStyles;
  confirmText: string;
  onConfirm: () => void;
  closeText: string;
  onClose?: () => void;
  open?: boolean;
  onOpenChange?: (boolean: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ConfirmModal = React.forwardRef<any, ConfirmEventProps>((props: ConfirmEventProps, ref) => {
  const {
    open,
    title,
    closeText,
    confirmText,
    confirmColor,
    content,
    children,
    onConfirm,
    onClose,
    onOpenChange,
  } = props;

  return (
    <Dialog modal open={open} ref={ref} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Adapt platform="touch" when="sm">
        <Sheet dismissOnSnapToBottom modal animation="quick" snapPointsMode="fit" zIndex={200000}>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
          <Sheet.Handle />
          <Sheet.Frame gap="$1" paddingHorizontal="$4" paddingVertical="$4">
            <Adapt.Contents />
          </Sheet.Frame>
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          key="overlay"
          opacity={0.5}
        />

        <Dialog.Content
          bordered
          elevate
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          className="cd-h-full"
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$0"
          key="content"
        >
          <Dialog.Title>
            <Text className="cd-text-lg cd-font-semibold cd-text-gray-800 dark:cd-text-gray-200">
              {title}
            </Text>
          </Dialog.Title>

          <Separator className="cd-my-[16]" />

          <Dialog.Description>
            <React.Fragment>
              {React.isValidElement(content) ? (
                content
              ) : (
                <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-200">
                  {content}
                </Text>
              )}
            </React.Fragment>
          </Dialog.Description>

          <XStack
            alignContent="flex-end"
            alignSelf="flex-end"
            className="cd-mb-[32]"
            gap="$3"
            justifyContent="flex-end"
            marginTop="$3"
          >
            <Dialog.Close asChild displayWhenAdapted>
              <ButtonCustom
                aria-label="Close"
                color={confirmColor ?? 'red'}
                text={confirmText}
                variant="secondary"
                onPress={onConfirm}
              />
            </Dialog.Close>
            <Dialog.Close asChild displayWhenAdapted>
              <ButtonCustom
                aria-label="Close"
                text={closeText}
                variant="secondary"
                onPress={onClose}
              />
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                circular
                icon={X}
                position="absolute"
                right="$3"
                size="$2"
                top="$3"
                onPress={onClose}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
});

export default ConfirmModal;

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { X } from '@tamagui/lucide-icons';
import { Button, Sheet, Text, Unspaced, View, XStack } from 'tamagui';

import { ColorsTheme } from '@constants/Colors';

import ButtonCustom from './button';
import SeparatorCustom from './separator-custom';

type ConfirmEventProps = {
  title: string;
  content: string | React.ReactNode;
  children?: React.ReactNode;
  confirmColor?: keyof (typeof ColorsTheme)['light'];
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
    <Sheet open={open} ref={ref} snapPointsMode="fit" onOpenChange={onOpenChange}>
      {children ?? <View asChild>{children}</View>}

      <Sheet.Overlay
        animation="lazy"
        backgroundColor="$shadow6"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />

      <Sheet.Frame alignItems="flex-start" justifyContent="center" padding="$4">
        <SheetContents
          closeText={closeText}
          confirmColor={confirmColor}
          confirmText={confirmText}
          content={content}
          title={title}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      </Sheet.Frame>
    </Sheet>
  );
});

type SheetContentsProps = {
  title: string;
  content: string | React.ReactNode;
  confirmColor?: keyof (typeof ColorsTheme)['light'];
  confirmText: string;
  onConfirm: () => void;
  closeText: string;
  onClose?: () => void;
};

const SheetContents = React.memo((props: SheetContentsProps) => {
  const { closeText, confirmText, content, onConfirm, title, confirmColor, onClose } = props;

  return (
    <React.Fragment>
      <Text className="cd-text-lg cd-font-bold cd-text-gray-800 dark:cd-text-gray-200">
        {title}
      </Text>

      <SeparatorCustom classes="cd-my-[16]" />

      <View flex={1} flexDirection="column" gap="$0.5">
        <React.Fragment>
          {React.isValidElement(content) ? (
            content
          ) : (
            <Text className="cd-text-base cd-text-gray-800 dark:cd-text-gray-200">{content}</Text>
          )}
        </React.Fragment>
      </View>

      <XStack
        alignContent="flex-end"
        alignSelf="flex-end"
        className="cd-mb-[32]"
        gap="$3"
        justifyContent="flex-end"
        marginTop="$3"
      >
        <ButtonCustom
          aria-label="Close"
          color={confirmColor ?? 'red'}
          text={confirmText}
          onPress={onConfirm}
        />

        <ButtonCustom aria-label="Close" text={closeText} onPress={onClose} />
      </XStack>

      <Unspaced>
        <Button
          circular
          icon={X}
          position="absolute"
          right="$3"
          size="$2"
          top="$3"
          onPress={onClose}
        />
      </Unspaced>
    </React.Fragment>
  );
});

export default ConfirmModal;

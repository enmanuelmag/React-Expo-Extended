/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Adapt, Dialog, Text, Sheet } from 'tamagui';

type DialogProps = {
  content: string | React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (boolean: boolean) => void;
  snapPointsMode?: 'fit' | 'percent';
  portalProps?: {
    host: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DialogPop = React.forwardRef<any, DialogProps>((props: DialogProps, ref) => {
  const { children, content, open, onOpenChange } = props;
  return (
    <Dialog modal open={open} ref={ref} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Adapt>
        <Sheet dismissOnSnapToBottom modal zIndex={100000}>
          <Sheet.Frame gap="$4" padding="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          key="overlay"
          opacity={0.1}
        />
        <Dialog.Content
          elevate
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          borderColor="$borderColor"
          borderWidth={1}
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
        >
          <View>{React.isValidElement(content) ? content : <Text>{content}</Text>}</View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
});

export default DialogPop;

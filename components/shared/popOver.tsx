/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Adapt, Popover, Text } from 'tamagui';

type PopoverProps = {
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
const PopOver = React.forwardRef<any, PopoverProps>((props: PopoverProps, ref) => {
  const { children, content, open, onOpenChange, portalProps, snapPointsMode = 'fit' } = props;
  return (
    <Popover open={open} placement="bottom" ref={ref} size="$1" onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Adapt platform="touch" when="sm">
        <Popover.Sheet
          dismissOnSnapToBottom
          modal
          moveOnKeyboardChange
          portalProps={portalProps}
          snapPoints={snapPointsMode === 'fit' ? undefined : [50]}
          snapPointsMode={snapPointsMode}
        >
          <Popover.Sheet.Overlay
            animation="quick"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Popover.Sheet.Handle backgroundColor="white" />
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
        </Popover.Sheet>
      </Adapt>
      <Popover.Content
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
        <Popover.Arrow borderColor="$borderColor" borderWidth={1} />
        <View className="cd-pb-[32]">
          {React.isValidElement(content) ? content : <Text>{content}</Text>}
        </View>
      </Popover.Content>
    </Popover>
  );
});

export default PopOver;

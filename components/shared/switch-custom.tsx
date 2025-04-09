import { $ } from '@utils/styles';
import React from 'react';
import { Label, Switch, TamaguiElement, Text, XStack, YStack } from 'tamagui';

type SwitchProps = {
  classes?: string;
  fullWidth?: boolean;
  defaultChecked?: boolean;
  value?: boolean;
  label: string;
  description?: string;
  name?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

const activeColor = '$blue8';

const inactiveColor = '$gray6';

const SwitchWithLabel = React.forwardRef<TamaguiElement, SwitchProps>((props: SwitchProps, ref) => {
  const {
    fullWidth,
    description,
    classes,
    label,
    name,
    disabled,
    defaultChecked,
    value,
    onChange,
  } = props;

  return (
    <XStack
      alignContent="center"
      alignItems="center"
      className={$('cd-w-full !cd-max-w-full cd-relative', classes)}
      gap={fullWidth ? '$0' : '$4'}
      justifyContent={fullWidth ? 'space-between' : 'flex-start'}
      onPress={() => {}}
    >
      <YStack flexBasis={fullWidth ? '80%' : undefined}>
        <Label className="cd-font-bold cd-leading-[14] dark:cd-text-white">{label}</Label>
        {description && (
          <Text className="cd-text-gray-500 cd-text-sm dark:cd-text-gray-400 cd-break-all">
            {description}
          </Text>
        )}
      </YStack>
      <XStack flexBasis={fullWidth ? '20%' : undefined} justifyContent="flex-end">
        <Switch
          bg={value ? activeColor : inactiveColor}
          borderColor={value ? activeColor : inactiveColor}
          checked={value}
          defaultChecked={defaultChecked}
          disabled={disabled}
          id={`${name}-switch-${defaultChecked}}`}
          native="ios"
          ref={ref}
          size="$3"
          onCheckedChange={(v) => {
            onChange && onChange(v);
          }}
        >
          <Switch.Thumb animation="quick" bg="white" />
        </Switch>
      </XStack>
    </XStack>
  );
});

export default SwitchWithLabel;

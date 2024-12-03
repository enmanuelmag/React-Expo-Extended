/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TamaguiTextElement,
  AnimatePresence,
  YStack,
  Select,
  Adapt,
  Label,
  Sheet,
  Text,
} from 'tamagui';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

import { UI } from '@constants/app';
import { $ } from '@/utils/styles';

export type ItemSelect = {
  id: string;
  name: string;
};

type SelectItemProps = {
  value?: ItemSelect;
  defaultValue?: ItemSelect;
  label: string;
  name?: string;
  error?: string;
  placeholder?: string;
  items: ItemSelect[];
  onChange?: (item: ItemSelect) => void;
};

const SelectCustom = React.forwardRef<TamaguiTextElement, SelectItemProps>(
  (props: SelectItemProps, ref) => {
    const { name, error, items, value, defaultValue, placeholder, label, onChange } = props;

    const [valueSelected, setValueSelected] = React.useState<ItemSelect | undefined>(value);

    React.useEffect(() => {
      setValueSelected(value);
    }, [value]);

    return (
      <YStack gap="$1.5">
        <Label className="cd-font-bold cd-leading-[14px] dark:cd-text-white">{label}</Label>
        <Select
          defaultValue={defaultValue?.name}
          id={name}
          name={name}
          native={false}
          size={UI.Size}
          value={valueSelected?.name}
          onValueChange={(v) => {
            if (onChange) {
              const item = items.find((i) => i.name === v);
              if (item) {
                onChange(item);
              }
            }
          }}
        >
          <Select.Trigger disabled={items.length === 0} iconAfter={ChevronDown}>
            <Select.Value
              className={$(
                valueSelected?.id === 'empty' && 'cd-text-gray-400 cd-font-semibold',
                'cd-text-ellipsis',
              )}
              maxWidth="90%"
              placeholder={placeholder}
              ref={ref}
            >
              {valueSelected?.name ?? ''}
            </Select.Value>
          </Select.Trigger>
          <Adapt platform="touch" when="sm">
            <Sheet
              dismissOnSnapToBottom
              modal
              native={false}
              snapPoints={[items.length > 8 ? 60 : 35]}
              snapPointsMode="percent"
            >
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
              <Sheet.Handle />

              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
            </Sheet>
          </Adapt>

          <Select.Content zIndex={200000}>
            <Select.ScrollUpButton
              alignItems="center"
              height="$3"
              justifyContent="center"
              position="relative"
              width="100%"
            >
              <YStack zIndex={10}>
                <ChevronUp size={20} />
              </YStack>
            </Select.ScrollUpButton>
            <Select.Viewport minWidth={200}>
              <Select.Group>
                <Select.Label>{label}</Select.Label>
                {items.map((item, i) => {
                  return (
                    <Select.Item
                      className={$(i === items.length - 1 && 'cd-mb-[64]')}
                      index={i}
                      key={`${item.name}-${i}`}
                      value={item.name}
                    >
                      <Select.ItemText
                        className={$(
                          item.id === 'empty' && 'cd-text-gray-500 cd-font-semibold',
                          'cd-text-ellipsis',
                        )}
                        paddingRight={16}
                      >
                        {item.name}
                      </Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                })}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton
              alignItems="center"
              height="$3"
              justifyContent="center"
              position="relative"
              width="100%"
            >
              <YStack zIndex={10}>
                <ChevronDown size={20} />
              </YStack>
            </Select.ScrollDownButton>
          </Select.Content>
        </Select>
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
  },
);

export default SelectCustom;

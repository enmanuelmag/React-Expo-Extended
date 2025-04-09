import React from 'react';
import { Separator, Text } from 'tamagui';
import { View } from 'react-native';
import { $ } from '@utils/styles';

type SeparatorCustomProps = {
  classes?: string;
  text?: string;
  textSpacing?: number;
  vertical?: boolean;
};

const SeparatorCustom = (props: SeparatorCustomProps) => {
  const { classes, text, vertical, textSpacing } = props;

  if (vertical) {
    return (
      <View className={$('cd-flex cd-flex-col cd-items-center', classes)}>
        <Separator vertical />
        {text && (
          <React.Fragment>
            <Text className={$('cd-text-gray-500')} paddingVertical={textSpacing}>
              {text}
            </Text>
            <Separator vertical />
          </React.Fragment>
        )}
      </View>
    );
  }

  return (
    <View className={$('cd-flex cd-flex-row cd-items-center', classes)}>
      <Separator />
      {text && (
        <React.Fragment>
          <Text className={$('cd-text-gray-500')} paddingHorizontal={textSpacing}>
            {text}
          </Text>
          <Separator />
        </React.Fragment>
      )}
    </View>
  );
};

export default SeparatorCustom;

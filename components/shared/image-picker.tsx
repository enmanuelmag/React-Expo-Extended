/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Image } from 'expo-image';
import { Text, View, YStack } from 'tamagui';

import { FileImage, X } from '@tamagui/lucide-icons';

import { blurhash } from '@constants/image';
import { ColorsTheme } from '@constants/Colors';

import { usePickImage } from '@hooks/use-pick-image';

import ButtonCustom from './button';
import ActionIcon from './action-icon';

type ImagePickerProps = {
  classes?: string;
  text: string;
  error?: string;
  value?: string | null;
  loading?: boolean;
  color?: keyof (typeof ColorsTheme)['light'];
  onChange: (value?: string | null) => void;
  onRemove: () => void;
  onPickerOpen?: () => void;
};

const ImagePickerCustom = React.forwardRef<any, ImagePickerProps>(
  (props: ImagePickerProps, ref) => {
    const { value, error, loading, text, classes, onChange, onRemove, onPickerOpen } = props;

    const { launch } = usePickImage({
      handleImage,
      onPickerOpen,
    });

    return (
      <YStack gap="$4">
        <View>
          <ButtonCustom
            classes={classes}
            iconLeft={<FileImage color="$blue8" size="$1.5" />}
            loading={loading}
            text={text}
            variant="outline"
            onPress={launch}
          />
          {error && <Text className="cd-text-red-500 cd-text-sm cd-mt-[4]">{error}</Text>}
        </View>
        {value && (
          <View ref={ref}>
            <Image
              className="cd-rounded-lg cd-w-full cd-h-[200px]"
              contentFit="cover"
              placeholder={{ blurhash }}
              source={{
                uri: value,
              }}
              transition={1000}
            />
            <ActionIcon
              classes="cd-absolute cd-top-0 cd-right-0 cd-m-1 cd-rounded-full cd-bg-white cd-p-[0] cd-shadow-md"
              icon={<X color="$gray11" size={18} />}
              size={35}
              variant="icon"
              onPress={onRemove}
            />
          </View>
        )}
      </YStack>
    );

    function handleImage(image: string) {
      if (loading) return;

      onChange(image);
    }
  },
);

export default ImagePickerCustom;

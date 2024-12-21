import { useColorScheme } from 'nativewind';
import { Spinner, Text, View, XStack } from 'tamagui';
import { $ } from '@utils/styles';

type LoaderProps = {
  color?: string;
  size?: 'small' | 'large';
  text?: string;
  classes?: string;
};

const LoaderText = ({ classes, size, text }: LoaderProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <XStack justifyContent="center">
      <View className={$('cd-w-full cd-flex cd-flex-col cd-justify-center', classes)}>
        <Spinner
          color={colorScheme === 'light' ? '$blue11' : '$blue11Dark'}
          size={size ?? 'small'}
        />
        <Text className="cd-mt-[8] cd-text-base cd-text-center">{text}</Text>
      </View>
    </XStack>
  );
};

export default LoaderText;

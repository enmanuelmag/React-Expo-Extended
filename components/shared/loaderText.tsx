import { useColorScheme } from 'nativewind';
import { Spinner, View } from 'tamagui';
import Text from './textDeprecated';

type LoaderProps = {
  color?: string;
  size?: 'small' | 'large';
  text?: string;
  classes?: string;
};

const LoaderText = ({ classes, size, text }: LoaderProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className={classes}>
      <Spinner color={colorScheme === 'light' ? '$blue11' : '$blue11Dark'} size={size ?? 'small'} />
      <Text classes="cd-text-lg cd-text-center" intensity={600}>
        {text}
      </Text>
    </View>
  );
};

export default LoaderText;

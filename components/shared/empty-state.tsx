import type { SvgProps } from 'react-native-svg';

import { Text, View } from 'tamagui';

type EmptyStateProps = {
  text?: string;
  image?: React.FC<SvgProps> | React.ReactElement;
  children?: React.ReactNode;
};

const EmptyState = ({ children, image, text }: EmptyStateProps) => (
  <View>
    {Boolean(image) && (
      <View className="cd-w-full cd-flex cd-flex-col cd-justify-center cd-items-center">
        {image}
      </View>
    )}
    {text && (
      <Text className="cd-text-gray-600 cd-text-lg cd-text-center dark:cd-text-gray-400">
        {text}
      </Text>
    )}
    {children && children}
  </View>
);

export default EmptyState;

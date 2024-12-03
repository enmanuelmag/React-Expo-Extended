import { Text } from 'tamagui';

import { $ } from '@utils/styles';

type LogoProps = {
  normal: string;
  colored: string;
  classes?: string;
  className?: string;
};

const Logo = (props: LogoProps) => {
  const { normal, colored, classes } = props;
  return (
    <Text className={$('cd-font-bold cd-text-xl dark:cd-text-white', classes)}>
      {normal}
      <Text className="cd-text-primary dark:cd-text-primary-dark cd-font-bold">{colored}</Text>
    </Text>
  );
};

export default Logo;

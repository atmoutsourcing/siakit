import Lottie from 'react-lottie';

import emptyDarkAnimationData from '../../assets/animations/empty_dark.json';
import emptyAnimationData from '../../assets/animations/empty.json';
import { useTheme } from '../../hooks/theme';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Heading } from '../Heading';
import { Text } from '../Text';

type EmptyProps = {
  title: string;
  description: string;
  actionText?: string;
  action?: () => void;
};

export function Empty({
  title,
  description,
  actionText,
  action,
}: EmptyProps): JSX.Element {
  const { colorScheme, theme } = useTheme();

  return (
    <Flex
      flex
      justify="center"
      align="center"
      direction="column"
      gap={24}
      padding="0 0 32px 0"
    >
      {theme === 'light' ? (
        <Lottie
          height={176}
          width={176}
          options={{
            autoplay: true,
            loop: false,
            animationData: emptyAnimationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          isPaused={false}
          isStopped={false}
        />
      ) : (
        <Lottie
          height={176}
          width={176}
          options={{
            autoplay: true,
            loop: false,
            animationData: emptyDarkAnimationData,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
          isPaused={false}
          isStopped={false}
        />
      )}

      <Flex direction="column" gap={8} align="center">
        <Heading size="sm">{title}</Heading>
        <Text size="sm" lowContrast>
          {description}
        </Text>
      </Flex>

      {!!action && !!actionText && (
        <Button type="button" colorScheme={colorScheme} onClick={action}>
          {actionText}
        </Button>
      )}
    </Flex>
  );
}

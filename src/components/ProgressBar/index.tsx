import React from 'react';

import { useTheme } from '../../hooks/theme';
import { Text } from '../Text';
import { Container, Content, Bar } from './styles';

type ProgressBarProps = {
  progress: number;
  showPercentage?: boolean;
};

export function ProgressBar({
  progress,
  showPercentage,
}: ProgressBarProps): JSX.Element {
  const { colorScheme } = useTheme();

  return (
    <Container>
      <Content>
        <Bar percentage={progress} colorScheme={colorScheme} />
      </Content>

      {showPercentage && <Text size="xs">{progress}%</Text>}
    </Container>
  );
}

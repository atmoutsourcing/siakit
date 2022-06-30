import React from 'react';

import { Direction, Container } from './styles';

type SeparatorProps = {
  direction?: Direction;
};

export function Separator({
  direction = 'horizontal',
}: SeparatorProps): JSX.Element {
  return <Container direction={direction} />;
}

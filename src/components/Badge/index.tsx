import React from 'react';

import * as ReactIcons from 'react-icons/all';

import { Colors } from '../../hooks/theme';
import { Container } from './styles';

type BadgeProps = {
  color: Colors;
  children: string;
  icon?: keyof typeof ReactIcons;
};

export function Badge({ color, children, icon }: BadgeProps): JSX.Element {
  const Icon = icon ? ReactIcons[icon] : undefined;

  return (
    <Container color={color}>
      {Icon && <Icon size="10" />}

      {children}
    </Container>
  );
}

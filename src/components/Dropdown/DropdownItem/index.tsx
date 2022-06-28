import React from 'react';

import * as ReactIcons from 'react-icons/all';

import { Container, Type } from './styles';

type DropdownItemProps = {
  children: string;
  onClick: () => void;
  type?: Type;
  icon?: keyof typeof ReactIcons;
};

export function DropdownItem({
  children,
  onClick,
  type = 'default',
  icon,
}: DropdownItemProps): JSX.Element {
  const Icon = icon ? ReactIcons[icon] : undefined;

  return (
    <Container type={type} onClick={onClick}>
      {Icon && <Icon size="14" />}

      {children}
    </Container>
  );
}

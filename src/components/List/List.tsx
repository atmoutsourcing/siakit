import React, { ReactNode } from 'react';

import { Container } from './styles';

type ListProps = {
  children: ReactNode;
  type?: 'unordered' | 'ordered';
};

export function List({ type = 'unordered', children }: ListProps): JSX.Element {
  return (
    <Container as={type === 'unordered' ? 'ul' : 'ol'}>{children}</Container>
  );
}

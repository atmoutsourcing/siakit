import React, { ReactNode } from 'react';

import { Container, ContainerProps } from './styles';

interface FlexProps extends ContainerProps {
  children: ReactNode;
}

export function Flex({ children, ...rest }: FlexProps): JSX.Element {
  return <Container {...rest}>{children}</Container>;
}

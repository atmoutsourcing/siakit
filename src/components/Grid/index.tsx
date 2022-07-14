import { ReactNode } from 'react';

import { Container, ContainerProps } from './styles';

interface GridProps extends ContainerProps {
  children: ReactNode;
}

export function Grid({ children, ...rest }: GridProps): JSX.Element {
  return <Container {...rest}>{children}</Container>;
}

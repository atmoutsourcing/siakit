import { ReactNode } from 'react';

import { Container } from './styles';

type SubMenuTitleProps = {
  children: ReactNode;
};

export function SubMenuTitle({ children }: SubMenuTitleProps): JSX.Element {
  return <Container>{children}</Container>;
}

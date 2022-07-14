import { ReactNode } from 'react';

import { Container } from './styles';

type FooterProps = {
  children: ReactNode;
};

export function Footer({ children }: FooterProps): JSX.Element {
  return <Container>{children}</Container>;
}

import React, { ReactNode } from 'react';

import { Align, Container, Size } from './styles';

type TextProps = {
  size?: Size;
  children: ReactNode;
  lowContrast?: boolean;
  align?: Align;
};

function Text({
  children,
  size = 'md',
  lowContrast = false,
  align = 'left',
}: TextProps): JSX.Element {
  return (
    <Container size={size} lowContrast={lowContrast} align={align}>
      {children}
    </Container>
  );
}

export default Text;

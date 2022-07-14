import { forwardRef, ReactNode } from 'react';

import { Align, Container, Size } from './styles';

type TextProps = {
  size?: Size;
  children: ReactNode;
  lowContrast?: boolean;
  align?: Align;
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ children, size = 'md', lowContrast = false, align = 'left' }, ref) => {
    return (
      <Container ref={ref} size={size} lowContrast={lowContrast} align={align}>
        {children}
      </Container>
    );
  },
);

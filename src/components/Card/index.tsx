import { forwardRef, ReactNode } from 'react';

import { Container } from './styles';

type CardProps = {
  children: ReactNode;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Container ref={ref} {...rest}>
        {children}
      </Container>
    );
  },
);

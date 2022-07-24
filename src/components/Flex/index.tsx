import { forwardRef, ReactNode } from 'react';

import { Container, FlexProps as ContainerProps } from './styles';

interface FlexProps extends ContainerProps {
  children: ReactNode;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Container ref={ref} {...rest}>
        {children}
      </Container>
    );
  },
);

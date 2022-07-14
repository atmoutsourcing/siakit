import { forwardRef, ReactNode } from 'react';

import {
  Container1,
  Container2,
  Container3,
  Container4,
  Container5,
  Container6,
  Container,
  Size,
} from './styles';

type HeadingProps = {
  size?: Size;
  children: ReactNode;
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, size = 'lg' }, ref) => {
    if (size === '5xl') {
      return <Container1 ref={ref}>{children}</Container1>;
    }

    if (size === '4xl') {
      return <Container2 ref={ref}>{children}</Container2>;
    }

    if (size === '3xl') {
      return <Container3 ref={ref}>{children}</Container3>;
    }

    if (size === '2xl') {
      return <Container4 ref={ref}>{children}</Container4>;
    }

    if (size === 'xl') {
      return <Container5 ref={ref}>{children}</Container5>;
    }

    if (size === 'lg') {
      return <Container6 ref={ref}>{children}</Container6>;
    }

    return (
      <Container ref={ref} size={size}>
        {children}
      </Container>
    );
  },
);

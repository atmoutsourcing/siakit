import React, { Children, cloneElement } from 'react';

import { Container } from './styles';

type TimelineProps = {
  children: any;
};

export function Timeline({ children }: TimelineProps): JSX.Element {
  const childrenLength = children.length;

  return (
    <Container>
      {Children.map(children, (child, index) => {
        return cloneElement(
          child,
          { ...child.props, withLine: index <= childrenLength - 2 },
          child.props.children,
        );
      })}
    </Container>
  );
}

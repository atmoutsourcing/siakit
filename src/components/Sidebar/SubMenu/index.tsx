import { Children, cloneElement } from 'react';

import { Container } from './styles';

type SubMenuProps = {
  children: any;
  value: string;
};

export function SubMenu({ children, value }: SubMenuProps): JSX.Element {
  return (
    <Container key={value}>
      {Children.map(children, (child, index) => {
        return cloneElement(
          child,
          { ...child.props, index },
          child.props.children,
        );
      })}
    </Container>
  );
}

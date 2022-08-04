import { ReactElement } from 'react';

import { Container, Type } from './styles';

type DropdownItemProps = {
  children: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  type?: Type;
  icon?: ReactElement;
};

export function DropdownItem({
  children,
  onClick,
  type = 'default',
  icon,
}: DropdownItemProps): JSX.Element {
  return (
    <Container
      type={type}
      onClick={(event) => {
        if (event) {
          onClick(event);
        }
      }}
    >
      <>{icon}</>

      {children}
    </Container>
  );
}

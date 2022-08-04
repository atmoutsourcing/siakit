import { ReactElement } from 'react';

import { Colors } from '../../hooks/theme';
import { Container } from './styles';

type BadgeProps = {
  color: Colors;
  children: string;
  icon?: ReactElement;
};

export function Badge({ color, children, icon }: BadgeProps): JSX.Element {
  return (
    <Container color={color}>
      <>{icon}</>

      {children}
    </Container>
  );
}

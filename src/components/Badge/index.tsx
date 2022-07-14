import { icons } from '../../helpers/icons';
import { Colors } from '../../hooks/theme';
import { Container } from './styles';

type BadgeProps = {
  color: Colors;
  children: string;
  icon?: keyof typeof icons;
};

export function Badge({ color, children, icon }: BadgeProps): JSX.Element {
  const Icon = icon ? icons[icon] : undefined;

  return (
    <Container color={color}>
      {Icon && <Icon size="10" />}

      {children}
    </Container>
  );
}

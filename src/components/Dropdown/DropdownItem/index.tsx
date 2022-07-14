import { icons } from '../../../helpers/icons';
import { Container, Type } from './styles';

type DropdownItemProps = {
  children: string;
  onClick: () => void;
  type?: Type;
  icon?: keyof typeof icons;
};

export function DropdownItem({
  children,
  onClick,
  type = 'default',
  icon,
}: DropdownItemProps): JSX.Element {
  const Icon = icon ? icons[icon] : undefined;

  return (
    <Container type={type} onClick={onClick}>
      {Icon && <Icon size="14" />}

      {children}
    </Container>
  );
}

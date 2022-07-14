import { Container } from './styles';

type DropdownTitleProps = {
  children: string;
};

export function DropdownTitle({ children }: DropdownTitleProps): JSX.Element {
  return <Container>{children}</Container>;
}

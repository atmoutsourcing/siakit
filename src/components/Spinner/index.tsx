import { Container } from './styles';

interface SpinnerProps {
  inverted?: boolean;
}

export function Spinner({ inverted = false }: SpinnerProps): JSX.Element {
  return <Container inverted={inverted} />;
}

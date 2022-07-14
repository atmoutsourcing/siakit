import { Container } from './styles';

type SpacerHeight = {
  height: boolean | number | string;
  width?: boolean | number | string;
};

type SpacerWidth = {
  height?: boolean | number | string;
  width: boolean | number | string;
};

type SpacerProps = SpacerHeight | SpacerWidth;

export function Spacer({ height, width }: SpacerProps): JSX.Element {
  return <Container h={height} width={width} />;
}

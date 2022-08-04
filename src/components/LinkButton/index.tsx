import { ReactElement } from 'react';

import { Colors, useTheme } from '../../hooks/theme';
import { Heading } from '../Heading';
import { Container, Size } from './styles';

type LinkButtonProps = {
  type?: 'submit' | 'button';
  children: string;
  colorScheme?: Colors;
  size?: Size;
  onClick: () => void;
  disabled?: boolean;
  icon?: ReactElement;
};

export function LinkButton({
  children,
  type = 'button',
  colorScheme,
  size = 'md',
  onClick,
  disabled,
  icon,
}: LinkButtonProps): JSX.Element {
  const { colorScheme: themeColorScheme } = useTheme();

  return (
    <Container
      type={type === 'button' ? 'button' : 'submit'}
      colorScheme={colorScheme || themeColorScheme}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      <>{icon}</>

      <Heading size={size === 'sm' ? 'xs' : 'sm'}>{children}</Heading>
    </Container>
  );
}

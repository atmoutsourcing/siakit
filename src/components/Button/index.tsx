import { forwardRef, ReactElement } from 'react';

import { Colors, useTheme } from '../../hooks/theme';
import { Heading } from '../Heading';
import { Container, Size, Variant } from './styles';

type ButtonProps = {
  type: 'submit' | 'button';
  children: string;
  colorScheme?: Colors;
  size?: Size;
  variant?: Variant;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactElement;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      type,
      colorScheme,
      size = 'md',
      variant = 'primary',
      onClick,
      disabled,
      icon,
      ...rest
    },
    ref,
  ) => {
    const { colorScheme: themeColorScheme } = useTheme();

    return (
      <Container
        ref={ref}
        type={type === 'button' ? 'button' : 'submit'}
        colorScheme={colorScheme || themeColorScheme}
        size={size}
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        <>{icon}</>

        <Heading size={size === 'sm' ? 'xs' : 'sm'}>{children}</Heading>
      </Container>
    );
  },
);

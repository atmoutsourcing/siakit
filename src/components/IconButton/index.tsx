import { forwardRef, ReactElement } from 'react';

import { Colors, useTheme } from '../../hooks/theme';
import { Size, Variant, Container } from './styles';

type IconButtonProps = {
  type: 'submit' | 'button';
  colorScheme?: Colors;
  size?: Size;
  variant?: Variant;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  icon: ReactElement;
  tabIndex?: number;
  visible?: boolean;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      type,
      colorScheme,
      size = 'md',
      variant = 'primary',
      onClick,
      disabled,
      icon,
      tabIndex,
      visible = true,
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
        tabIndex={tabIndex}
        visible={visible}
        {...rest}
      >
        {icon}
      </Container>
    );
  },
);

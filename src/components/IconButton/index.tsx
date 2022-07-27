import { forwardRef } from 'react';

import { icons } from '../../helpers/icons';
import { Colors, useTheme } from '../../hooks/theme';
import { Size, Variant, Container } from './styles';

type IconButtonProps = {
  type: 'submit' | 'button';
  colorScheme?: Colors;
  size?: Size;
  variant?: Variant;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  icon: keyof typeof icons;
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

    function iconSize(): number {
      if (size === 'sm') {
        return 12;
      }

      if (size === 'lg') {
        return 20;
      }

      return 16;
    }

    const Icon = icon ? icons[icon] : undefined;

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
        {Icon && <Icon size={iconSize()} />}
      </Container>
    );
  },
);

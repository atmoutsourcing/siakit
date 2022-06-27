import React, { forwardRef } from 'react';

import * as ReactIcons from 'react-icons/all';

import { Colors, useTheme } from '../../hooks/theme';
import { Size, Variant, Container } from './styles';

type IconButtonProps = {
  type: 'submit' | 'button';
  colorScheme?: Colors;
  size?: Size;
  variant?: Variant;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  icon: keyof typeof ReactIcons;
  tabIndex?: number;
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

    const Icon = icon ? ReactIcons[icon] : undefined;

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
        {...rest}
      >
        {Icon && <Icon size={iconSize()} />}
      </Container>
    );
  },
);

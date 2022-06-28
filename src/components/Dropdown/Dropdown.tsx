import React, { ReactNode } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type DropdownProps = {
  children: ReactNode[];
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
};

export function Dropdown({
  side = 'bottom',
  align = 'center',
  children,
}: DropdownProps): JSX.Element {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children[0]}</DropdownMenu.Trigger>

      <DropdownMenu.Content asChild sideOffset={4} side={side} align={align}>
        {children[1]}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

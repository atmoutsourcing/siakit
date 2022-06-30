import React, { ReactNode } from 'react';

import * as RadixPopover from '@radix-ui/react-popover';

import { Card } from '../Card';

type PopoverProps = {
  children: ReactNode[];
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
};

export function Popover({
  children,
  side = 'top',
  align = 'center',
}: PopoverProps): JSX.Element {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{children[0]}</RadixPopover.Trigger>

      <RadixPopover.Content asChild side={side} align={align} sideOffset={4}>
        <Card>{children[1]}</Card>
      </RadixPopover.Content>
    </RadixPopover.Root>
  );
}

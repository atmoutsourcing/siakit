import React, { ReactNode } from 'react';

import * as RadixHoverCard from '@radix-ui/react-hover-card';

import { Card } from '../Card';

type HoverCardProps = {
  children: ReactNode[];
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
};

export function HoverCard({
  children,
  side = 'top',
  align = 'center',
}: HoverCardProps): JSX.Element {
  return (
    <RadixHoverCard.Root>
      <RadixHoverCard.Trigger asChild>{children[0]}</RadixHoverCard.Trigger>

      <RadixHoverCard.Content asChild side={side} align={align} sideOffset={4}>
        <Card>{children[1]}</Card>
      </RadixHoverCard.Content>
    </RadixHoverCard.Root>
  );
}

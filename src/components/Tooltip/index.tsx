import React, { ReactNode } from 'react';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { useTheme } from 'styled-components';

import { Content } from './styles';

type TooltipProps = {
  children: ReactNode;
  content: string | undefined;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
};

export function Tooltip({
  children,
  content,
  side = 'top',
  align = 'center',
}: TooltipProps): JSX.Element {
  const theme = useTheme();

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={400}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>

        {!!content && (
          <Content side={side} align={align} sideOffset={4}>
            <RadixTooltip.Arrow fill={theme.colors.gray[12]} />

            <p>{content}</p>
          </Content>
        )}
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

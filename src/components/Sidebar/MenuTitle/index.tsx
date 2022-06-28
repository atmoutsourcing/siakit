import React, { useContext } from 'react';

import { useTheme } from '../../../hooks/theme';
import { SidebarContext } from '../SidebarContext';
import { Container } from './styles';

type MenuTitleProps = {
  children: string;
};

export function MenuTitle({ children }: MenuTitleProps): JSX.Element {
  const { colorScheme, theme } = useTheme();

  const { isExpanded } = useContext(SidebarContext);

  return (
    <Container
      colorScheme={colorScheme}
      isExpanded={!!isExpanded}
      appTheme={theme}
    >
      {isExpanded ? children : `${children.slice(0, 4)}.`}
    </Container>
  );
}

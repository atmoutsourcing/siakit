import React, { ReactNode, useContext } from 'react';

import { useTheme } from '../../../hooks/theme';
import { SidebarContext } from '../SidebarContext';
import { Container } from './styles';

type MenuProps = {
  children: ReactNode;
};

export function Menu({ children }: MenuProps): JSX.Element {
  const { theme, colorScheme } = useTheme();

  const { isExpanded } = useContext(SidebarContext);

  return (
    <Container
      isExpanded={isExpanded}
      appTheme={theme}
      colorScheme={colorScheme}
    >
      {children}
    </Container>
  );
}

import { useMemo, ReactNode, useContext, useEffect } from 'react';

import { SidebarContext, SidebarProvider } from '../SidebarContext';
import { Container } from './styles';

type SidebarComponentProps = {
  children: any;
};

function SidebarComponent({ children }: SidebarComponentProps): JSX.Element {
  const { menuItemSelected, isExpanded, changeExpanded } =
    useContext(SidebarContext);

  const childrenIsArray = useMemo(() => Array.isArray(children), [children]);

  useEffect(() => {
    if (childrenIsArray) {
      const findSubMenu = children.find(
        (child: any) =>
          child?.type.name === 'SubMenu' &&
          child?.props.value === menuItemSelected,
      );

      if (!menuItemSelected || (menuItemSelected && !findSubMenu)) {
        changeExpanded(true);
      } else {
        changeExpanded(false);
      }
    } else {
      changeExpanded(true);
    }
  }, [menuItemSelected, childrenIsArray]);

  return (
    <Container>
      {childrenIsArray ? children[0] : children}

      {childrenIsArray &&
        !isExpanded &&
        children.find(
          (child: any) =>
            child?.type.name === 'SubMenu' &&
            child?.props.value === menuItemSelected,
        )}
    </Container>
  );
}

type SidebarProps = {
  children: ReactNode;
};

export function Sidebar({ children }: SidebarProps): JSX.Element {
  return (
    <SidebarProvider>
      <SidebarComponent>{children}</SidebarComponent>
    </SidebarProvider>
  );
}

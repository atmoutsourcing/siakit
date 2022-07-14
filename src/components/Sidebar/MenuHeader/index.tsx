import { useContext, useMemo } from 'react';

import { SidebarContext } from '../SidebarContext';
import { Container } from './styles';

type MenuHeaderProps = {
  children: any;
  onClick?: () => void;
};

export function MenuHeader({
  children,
  onClick,
}: MenuHeaderProps): JSX.Element {
  const { isExpanded } = useContext(SidebarContext);

  const childrenIsArray = useMemo(() => Array.isArray(children), [children]);

  const { selectMenuItem } = useContext(SidebarContext);

  function handleClick(): void {
    if (onClick) {
      onClick();

      selectMenuItem('');
    }
  }

  return (
    <Container
      isExpanded={!!isExpanded}
      onClick={onClick ? handleClick : undefined}
    >
      {isExpanded && childrenIsArray && children[0]}
      {isExpanded && !childrenIsArray && children}

      {!isExpanded && childrenIsArray && children[1] && children[1]}
      {!isExpanded && !childrenIsArray && children}
    </Container>
  );
}

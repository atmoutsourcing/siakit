import React, { useContext } from 'react';

import { SidebarContext } from '../SidebarContext';
import { Container } from './styles';

type SubMenuItemProps = {
  children: string;
  index?: number;
  onClick: () => void;
};

export function SubMenuItem({
  children,
  index,
  onClick,
}: SubMenuItemProps): JSX.Element {
  const { selectSubMenuItem, subMenuItemSelected } = useContext(SidebarContext);

  function handleClick(): void {
    if (typeof index === 'number') {
      selectSubMenuItem(index);

      if (onClick) {
        onClick();
      }
    }
  }

  return (
    <Container isSelected={subMenuItemSelected === index} onClick={handleClick}>
      {children}
    </Container>
  );
}

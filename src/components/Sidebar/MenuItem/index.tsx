import { ReactElement, useContext, useMemo } from 'react';

import { useTheme } from '../../../hooks/theme';
import { Tooltip } from '../../Tooltip';
import { SidebarContext } from '../SidebarContext';
import { Container } from './styles';

type MenuItemProps = {
  children: string;
  value: string;

  onClick?: () => void;
  icon?: ReactElement;
  activeIcon?: ReactElement;

  tooltip?: string;
};

export function MenuItem({
  children,
  value,
  onClick,
  icon,
  activeIcon,
  tooltip,
}: MenuItemProps): JSX.Element {
  const { colorScheme, theme } = useTheme();

  const { menuItemSelected, selectMenuItem, isExpanded } =
    useContext(SidebarContext);

  const isSelected = useMemo(
    () => menuItemSelected === value,
    [menuItemSelected],
  );

  const shortName = children[0].toUpperCase();

  return (
    <Tooltip content={!isExpanded ? tooltip : undefined} side="right">
      <Container
        onClick={() => {
          if (selectMenuItem) {
            selectMenuItem(value);
          }

          if (onClick) {
            onClick();
          }
        }}
        isSelected={isSelected}
        colorScheme={colorScheme}
        isExpanded={!!isExpanded}
        appTheme={theme}
      >
        {!isSelected && !!icon && <>{icon}</>}
        {isSelected && !!activeIcon ? (
          <>{activeIcon}</>
        ) : (
          isSelected && !activeIcon && !!icon && <>{icon}</>
        )}

        {!isExpanded && !icon && shortName}

        {isExpanded && children}
      </Container>
    </Tooltip>
  );
}

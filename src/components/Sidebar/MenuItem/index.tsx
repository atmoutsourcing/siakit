import React, { useContext, useMemo } from 'react';

import * as ReactIcons from 'react-icons/all';

import { useTheme } from '../../../hooks/theme';
import { Tooltip } from '../../Tooltip';
import { SidebarContext } from '../SidebarContext';
import { Container } from './styles';

type MenuItemProps = {
  children: string;
  value: string;

  onClick?: () => void;
  icon?: keyof typeof ReactIcons;
  activeIcon?: keyof typeof ReactIcons;

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

  const Icon = icon ? ReactIcons[icon] : undefined;
  const ActiveIcon = activeIcon ? ReactIcons[activeIcon] : undefined;

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
        {!isSelected && Icon && <Icon size="16" />}
        {isSelected && ActiveIcon ? (
          <ActiveIcon size="16" />
        ) : (
          isSelected && !ActiveIcon && Icon && <Icon size="16" />
        )}

        {!isExpanded && !icon && shortName}

        {isExpanded && children}
      </Container>
    </Tooltip>
  );
}

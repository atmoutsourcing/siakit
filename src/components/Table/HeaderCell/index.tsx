import React, { ReactNode } from 'react';

import { HiArrowDown, HiArrowUp } from 'react-icons/hi';
import { RiArrowUpDownFill } from 'react-icons/ri';

import { useTheme } from '../../../hooks/theme';
import { Container } from './styles';

type SortType = {
  direction: string;
  dataIndex: string;
};

type HeaderCellProps = {
  isAction?: boolean;
  dataIndex?: string;
  isSort?: boolean;
  sort?: SortType;
  onSort?: (sort: SortType) => void;
  children: ReactNode;
  align?: string;
};

export function HeaderCell({
  isAction,
  dataIndex = '',
  isSort,
  sort,
  onSort,
  children,
  align,
}: HeaderCellProps): JSX.Element {
  const { colorScheme } = useTheme();

  function toggleDirection(): void {
    if (onSort) {
      if (!sort?.direction) {
        onSort({ dataIndex, direction: 'ASC' });
      }

      if (sort?.direction === 'ASC') {
        onSort({ dataIndex, direction: 'DESC' });
      }

      if (sort?.direction === 'DESC') {
        onSort({ dataIndex, direction: '' });
      }
    }
  }

  return (
    <Container
      colorScheme={colorScheme}
      isActive={['ASC', 'DESC'].includes(sort?.direction ?? '')}
      isAction={isAction}
      isSort={isSort && !!onSort}
      onClick={isSort && onSort ? toggleDirection : undefined}
      align={align}
      type="button"
    >
      {children}

      {isSort && onSort && !sort?.direction && (
        <RiArrowUpDownFill size="12" color="gray" />
      )}

      {isSort && onSort && sort?.direction === 'ASC' && (
        <HiArrowUp size="12" color="#0091FF" />
      )}

      {isSort && onSort && sort?.direction === 'DESC' && (
        <HiArrowDown size="12" color="#0091FF" />
      )}
    </Container>
  );
}

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components';

export const Container = styled(DropdownMenu.Label)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[11]};
  margin: 12px 12px 4px;
`;

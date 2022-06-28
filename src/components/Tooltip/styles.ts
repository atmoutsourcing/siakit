import { Content as TooltipContent } from '@radix-ui/react-tooltip';
import styled from 'styled-components';

export const Content = styled(TooltipContent)`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.gray[12]};
  border: 0;
  border-radius: 8px;
  max-width: 192px;

  p {
    color: ${({ theme }) => theme.colors.gray[1]};
    font-size: 14px;
  }
`;

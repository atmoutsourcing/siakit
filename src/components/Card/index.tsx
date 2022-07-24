import styled from 'styled-components';

import { flexStyle } from '../Flex/styles';

export const Card = styled.div`
  ${flexStyle};

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};
`;

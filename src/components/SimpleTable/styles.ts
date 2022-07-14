import styled from 'styled-components';

export const ItemContainer = styled.div`
  height: 44px;
  display: flex;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[6]};

  padding-right: 12px;
`;

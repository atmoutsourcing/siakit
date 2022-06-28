import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;

  height: 100%;

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.cardBackground};
  outline: 1px solid ${({ theme }) => theme.colors.gray[3]};
  z-index: 1;
`;

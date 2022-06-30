import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  to {
    transform: rotate(360deg)
  }
`;

export const Container = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  animation: ${animation} 0.9s linear infinite;

  border: 2px solid ${({ theme }) => theme.colors.gray[4]};
  border-left-color: ${({ theme }) => theme.colors.gray[11]};
`;

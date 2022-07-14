import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[3]};
  padding: 32px;
  border-radius: 8px;

  pre code {
    font-size: 14px;
    font-family: 'JetBrains Mono', monospace;
  }
`;

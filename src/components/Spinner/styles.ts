import styled, { keyframes } from 'styled-components';

const animation = keyframes`
  to {
    transform: rotate(360deg)
  }
`;

interface ContainerProps {
  inverted: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  animation: ${animation} 0.9s linear infinite;

  border: 2px solid
    ${({ theme, inverted }) => theme.colors.gray[inverted ? 11 : 4]};
  border-left-color: ${({ theme, inverted }) =>
    theme.colors.gray[inverted ? 4 : 11]};
`;

import styled from 'styled-components';

import { Colors } from '../../hooks/theme';

export const Container = styled.div`
  width: 100%;

  display: flex;

  align-items: center;
  gap: 8px;
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.gray[4]};
  border-radius: 4px;
`;

type BarProps = {
  percentage: number;
  colorScheme: Colors;
};

export const Bar = styled.div<BarProps>`
  position: relative;
  height: 8px;
  border-radius: 4px;
  transition: all 0.15s;

  width: ${({ percentage }) => percentage}%;
  background-color: ${({ theme, colorScheme }) => theme.colors[colorScheme][9]};

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.08) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.08) 50%,
      rgba(255, 255, 255, 0.08) 75%,
      transparent 75%,
      transparent
    );
    z-index: 1;
    background-size: 8px 8px;
    animation: move 2s linear infinite;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
  }
`;

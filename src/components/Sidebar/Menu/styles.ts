import styled, { css } from 'styled-components';

import { Theme, Colors } from '../../../hooks/theme';

type ContainerProps = {
  isExpanded: boolean;
  appTheme: Theme;
  colorScheme: Colors;
};

export const Container = styled.div<ContainerProps>`
  height: 100%;

  display: flex;
  flex-direction: column;

  z-index: 2;

  ${({ appTheme, colorScheme }) =>
    appTheme === 'light'
      ? css`
          background-color: ${({ theme }) => theme.colors[colorScheme][11]};
        `
      : css`
          background-color: ${({ theme }) => theme.colors.gray[2]};
        `}

  ${({ isExpanded }) =>
    isExpanded
      ? css`
          width: 240px;
        `
      : css`
          width: 48px;
        `}
`;

import styled, { css } from 'styled-components';

import { Colors, Theme } from '../../../hooks/theme';

type ContainerProps = {
  appTheme: Theme;
  colorScheme: Colors;
  isExpanded: boolean;
};

export const Container = styled.div<ContainerProps>`
  height: 32px;

  display: flex;
  align-items: flex-end;

  padding-bottom: 6px;

  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;

  ${({ appTheme, theme, colorScheme }) =>
    appTheme === 'light'
      ? css`
          color: ${theme.colors[colorScheme][6]};
        `
      : css`
          color: ${theme.colors.gray[11]};
        `}

  ${({ isExpanded }) =>
    isExpanded
      ? css`
          padding-left: 16px;
        `
      : css`
          justify-content: center;
        `}
`;

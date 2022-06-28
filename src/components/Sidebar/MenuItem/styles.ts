import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

import { Colors, Theme } from '../../../hooks/theme';

type ContainerProps = {
  isSelected: boolean;
  colorScheme: Colors;
  isExpanded?: boolean;
  appTheme: Theme;
};

export const Container = styled.a<ContainerProps>`
  position: relative;

  height: 32px;
  padding-left: 16px;

  cursor: pointer;

  display: flex;
  align-items: center;

  gap: 12px;

  font-size: 14px;
  font-weight: 400;

  ${({ appTheme, theme, colorScheme }) =>
    appTheme === 'light'
      ? css`
          color: ${theme.colors[colorScheme][6]};
        `
      : css`
          color: ${theme.colors.gray[11]};
        `}

  &:hover {
    background: ${({ theme, appTheme, colorScheme }) =>
      appTheme === 'light'
        ? `linear-gradient(
        to right,
        rgba(255, 255, 255, 0.12),
        rgba(255, 255, 255, 0.04)
      )`
        : `linear-gradient(
        to right,
        ${transparentize(0.75, theme.colors[colorScheme][9])},
        ${transparentize(0.95, theme.colors[colorScheme][9])}
      )`};
  }

  ${({ isSelected, theme, appTheme, colorScheme }) =>
    isSelected &&
    css`
      color: ${theme.colors.white};
      background: ${appTheme === 'light'
        ? `linear-gradient(
        to right,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.04)
      )`
        : `linear-gradient(
        to right,
        ${transparentize(0.65, theme.colors[colorScheme][9])},
        ${transparentize(0.95, theme.colors[colorScheme][9])}
      )`};

      svg {
        color: ${theme.colors.white};
      }

      &:before {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        left: 0;
        width: 2px;
        border-radius: 0 2px 2px 0;
        background-color: ${appTheme === 'light'
          ? theme.colors.white
          : theme.colors[colorScheme][9]};
      }
    `}

  ${({ isExpanded }) =>
    !isExpanded &&
    css`
      padding: 0;
      justify-content: center;
    `}
`;

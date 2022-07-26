import styled, { css } from 'styled-components';

import { Colors } from '../../../hooks/theme';
import { FlexProps, flexStyle } from '../../Flex/styles';

interface ContentProps extends FlexProps {
  colorScheme: Colors;
  isFocused: boolean;
  isFilled: string;
  isErrored: boolean;
  disabled: boolean;
}

export const Content = styled.div<ContentProps>`
  ${flexStyle};

  background-color: ${({ theme }) => theme.colors.gray[1]};
  border: 2px solid ${({ theme }) => theme.colors.gray[4]};
  border-radius: 8px;

  ${({ isFocused, theme, colorScheme }) =>
    isFocused &&
    css`
      background-color: ${theme.colors.gray[1]};
      border-color: ${theme.colors[colorScheme][9]};
    `}

  ${({ isFilled, theme }) =>
    isFilled &&
    css`
      background-color: ${theme.colors.gray[1]};
    `}

  ${({ isErrored, theme }) =>
    isErrored &&
    css`
      background-color: ${theme.colors.red[3]};
      border-color: ${theme.colors.red[9]};
    `}

  ${({ theme, disabled }) =>
    disabled &&
    css`
      background-color: ${theme.colors.gray[4]};
    `}

  .ProseMirror {
    flex: 1;
    overflow: auto;
    min-height: 320px;

    padding: 16px;

    font-size: 16px;

    outline: 0;

    > * + * {
      margin-top: 0.75em;
    }

    a {
      color: ${({ theme, colorScheme }) => theme.colors[colorScheme][9]};
    }

    ul,
    ol {
      padding: 0 1rem;
    }

    .editor-task-list {
      padding: 0;

      li {
        display: flex;
        gap: 8px;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }

    pre {
      background-color: ${({ theme }) => theme.colors.gray[3]};
      padding: 16px;
      border-radius: 8px;

      code {
        font-size: 14px;
        font-family: 'JetBrains Mono', monospace;
      }
    }

    img {
      display: block;
      max-width: 100%;
      height: auto;
    }

    blockquote {
      border-left-style: solid;
      border-left-width: 3px;
      border-left-color: ${({ theme }) => theme.colors.gray[6]};
      padding-left: 1rem;
    }

    hr {
      border: none;
      border-top: 2px solid rgba(#0d0d0d, 0.1);
      margin: 2rem 0;
    }

    p.is-editor-empty:first-child::before {
      color: #adb5bd;
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
  }
`;

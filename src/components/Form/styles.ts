import styled, { css } from 'styled-components';

import ResizerIcon from '../../assets/icons/resizer.svg';
import { Colors } from '../../hooks/theme';

type ContainerProps = {
  disabled: boolean;
};

export const InputContainer = styled.div<ContainerProps>`
  flex: 1;
  display: flex;
  flex-direction: column;

  gap: 4px;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
`;

export const RichTextInputContainer = styled.div<ContainerProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;

  gap: 4px;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
`;

export const TextAreaContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  gap: 4px;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
`;

type LabelProps = {
  isErrored: boolean;
};

export const Label = styled.label<LabelProps>`
  color: ${({ theme }) => theme.colors.gray[12]};
  font-size: 14px;
  font-weight: 400;

  ${({ isErrored, theme }) =>
    isErrored &&
    css`
      color: ${theme.colors.red[11]};
    `}
`;

type InputBodyProps = {
  isFocused: boolean;
  isFilled: string;
  isErrored: boolean;
  colorScheme: Colors;
  disabled: boolean;
};

export const InputBody = styled.div<InputBodyProps>`
  display: flex;

  background-color: ${({ theme }) => theme.colors.gray[1]};
  border: 2px solid ${({ theme }) => theme.colors.gray[4]};
  height: 32px;
  border-radius: 8px;
  padding: 0 4px 0 12px;

  transition: all 0.15s;

  > p {
    align-self: center;
    margin-right: 6px;
  }

  input {
    all: unset;

    flex: 1;

    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[12]};

    margin-right: 8px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[9]};
    }
  }

  > button {
    align-self: center;
  }

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
`;

export const TextAreaBody = styled.div<InputBodyProps>`
  position: relative;

  display: flex;

  background-color: ${({ theme }) => theme.colors.gray[1]};
  border: 2px solid ${({ theme }) => theme.colors.gray[4]};
  border-radius: 8px;
  /* padding: 0 4px 0 12px; */

  transition: all 0.15s;

  > p {
    align-self: center;
    margin-right: 6px;
  }

  textarea {
    all: unset;

    flex: 1;

    resize: vertical;

    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[12]};

    padding: 8px 12px;

    &::-webkit-resizer {
      width: 8px;
      height: 8px;
      background: url(${ResizerIcon}) no-repeat center;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[9]};
    }
  }

  > button {
    align-self: center;

    position: absolute;
    top: 4px;
    right: 4px;
  }

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
`;

export const Error = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.red[11]};
`;

export const ColorContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  gap: 4px;

  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}
`;

type ColorViewProps = {
  color: Colors;
};

export const ColorView = styled.div<ColorViewProps>`
  width: 12px;
  height: 12px;
  border-radius: 4px;

  align-self: center;

  background-color: ${({ theme, color }) => theme.colors[color][9]};
`;

type ColorButtonProps = {
  color: Colors;
};

export const ColorButton = styled.button<ColorButtonProps>`
  all: unset;

  width: 16px;
  height: 16px;
  border-radius: 4px;

  align-self: center;

  background-color: ${({ theme, color }) => theme.colors[color][9]};

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

type ChevronButtonProps = {
  active: boolean;
};

export const ChevronButton = styled.div<ChevronButtonProps>`
  width: 24px;
  height: 28px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray[9]};

  svg {
    transform: ${({ active }) => active && 'rotate(180deg)'};
  }
`;

type CheckboxBodyProps = {
  isErrored: boolean;
  direction: 'row' | 'column';
};

export const CheckboxBody = styled.div<CheckboxBodyProps>`
  display: flex;

  flex-direction: ${({ direction }) => direction};

  gap: 8px;
`;

interface SwitchBodyProps {
  isVertical: boolean;
}

export const SwitchBody = styled.div<SwitchBodyProps>`
  display: flex;

  align-items: center;

  gap: 8px;

  ${({ isVertical }) =>
    isVertical &&
    css`
      flex-direction: column-reverse;
      align-items: flex-start;
    `}
`;

export const LanguageItem = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;

  img {
    width: 24px;
  }

  p {
    font-size: 14px;
  }
`;

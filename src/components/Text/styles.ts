import styled, { css } from 'styled-components';

export type Size =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export type Align = 'left' | 'center' | 'right';

type ContainerProps = {
  size: Size;
  lowContrast: boolean;
  align: Align;
};

export const Container = styled.p<ContainerProps>`
  color: ${({ theme, lowContrast }) =>
    theme.colors.gray[lowContrast ? 11 : 12]};
  line-height: 1.5;
  text-align: ${({ align }) => align};

  ${({ size }) =>
    size === '6xl' &&
    css`
      font-size: 3.75rem;
    `}

  ${({ size }) =>
    size === '5xl' &&
    css`
      font-size: 3rem;
    `}

    ${({ size }) =>
    size === '4xl' &&
    css`
      font-size: 2.25rem;
    `}

    ${({ size }) =>
    size === '3xl' &&
    css`
      font-size: 1.875rem;
    `}

    ${({ size }) =>
    size === '2xl' &&
    css`
      font-size: 1.5rem;
    `}

  ${({ size }) =>
    size === 'xl' &&
    css`
      font-size: 1.25rem;
    `}

  ${({ size }) =>
    size === 'lg' &&
    css`
      font-size: 1.125rem;
    `}

  ${({ size }) =>
    size === 'md' &&
    css`
      font-size: 1rem;
    `}

  ${({ size }) =>
    size === 'sm' &&
    css`
      font-size: 0.875rem;
    `}

  ${({ size }) =>
    size === 'xs' &&
    css`
      font-size: 0.75rem;
    `}
`;

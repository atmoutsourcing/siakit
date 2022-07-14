import styled, { css } from 'styled-components';

type ContainerHeight = {
  h: boolean | number | string | undefined;
  width?: boolean | number | string | undefined;
};

type ContainerWidth = {
  h?: boolean | number | string | undefined;
  width: boolean | number | string | undefined;
};

type ContainerProps = ContainerHeight | ContainerWidth;

export const Container = styled.div<ContainerProps>`
  ${({ h }) =>
    h &&
    typeof h === 'boolean' &&
    css`
      height: 16px;
    `};

  ${({ h }) =>
    h &&
    typeof h === 'number' &&
    css`
      height: ${h}px;
    `};

  ${({ h }) =>
    h &&
    typeof h === 'string' &&
    css`
      height: ${h};
    `};

  ${({ width }) =>
    width &&
    typeof width === 'boolean' &&
    css`
      width: 16px;
    `};

  ${({ width }) =>
    width &&
    typeof width === 'number' &&
    css`
      width: ${width}px;
    `};

  ${({ width }) =>
    width &&
    typeof width === 'string' &&
    css`
      width: ${width};
    `};
`;

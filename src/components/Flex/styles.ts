import styled, { css } from 'styled-components';

type Overflow = 'auto' | 'hidden';

export type ContainerProps = {
  flex?: boolean | number;
  direction?: 'row' | 'column';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';

  gap?: boolean | number | string;
  margin?: boolean | number | string;
  padding?: boolean | number | string;

  width?: number | string;
  height?: number | string;

  maxWidth?: number | string;
  maxHeight?: number | string;

  overflow?: boolean | Overflow;
};

export const Container = styled.div<ContainerProps>`
  display: flex;

  ${({ overflow }) =>
    overflow &&
    css`
      overflow: ${typeof overflow === 'boolean' ? 'auto' : overflow};
    `}

  ${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `}

  ${({ align }) =>
    align &&
    css`
      align-items: ${align};
    `}

    ${({ direction }) =>
    direction &&
    css`
      flex-direction: ${direction};
    `}

  ${({ flex }) =>
    flex &&
    css`
      flex: ${typeof flex === 'boolean' ? 1 : flex};
    `}

    ${({ gap }) =>
    gap &&
    typeof gap === 'boolean' &&
    css`
      gap: 16px;
    `}

  ${({ gap }) =>
    gap &&
    typeof gap === 'number' &&
    css`
      gap: ${gap}px;
    `}

  ${({ gap }) =>
    gap &&
    typeof gap === 'string' &&
    css`
      gap: ${gap};
    `}

  ${({ padding }) =>
    padding &&
    typeof padding === 'boolean' &&
    css`
      padding: 16px;
    `}

  ${({ padding }) =>
    padding &&
    typeof padding === 'number' &&
    css`
      padding: ${padding}px;
    `}

  ${({ padding }) =>
    padding &&
    typeof padding === 'string' &&
    css`
      padding: ${padding};
    `}

  ${({ margin }) =>
    margin &&
    typeof margin === 'boolean' &&
    css`
      margin: 16px;
    `}

  ${({ margin }) =>
    margin &&
    typeof margin === 'number' &&
    css`
      margin: ${margin}px;
    `}

  ${({ margin }) =>
    margin &&
    typeof margin === 'string' &&
    css`
      margin: ${margin};
    `}

  ${({ width }) =>
    width &&
    css`
      max-width: ${typeof width === 'string' ? width : `${width}px`};
      width: ${typeof width === 'string' ? width : `${width}px`};
    `}

  ${({ height }) =>
    height &&
    css`
      max-height: ${typeof height === 'string' ? height : `${height}px`};
      height: ${typeof height === 'string' ? height : `${height}px`};
    `}

    ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`};
    `}

    ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${typeof maxHeight === 'string'
        ? maxHeight
        : `${maxHeight}px`};
    `}
`;

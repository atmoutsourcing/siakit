import styled, { css } from 'styled-components';

type Overflow = 'auto' | 'hidden';

export type FlexProps = {
  flex?: boolean | number;
  flexWrap?: 'wrap' | 'wrap-reverse' | 'nowrap' | 'unset';
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

export const flexStyle = ({
  overflow,
  justify,
  align,
  direction,
  flex,
  flexWrap,
  gap,
  padding,
  margin,
  width,
  height,
  maxWidth,
  maxHeight,
}: FlexProps): any => css`
  display: flex;

  ${overflow &&
  css`
    overflow: ${typeof overflow === 'boolean' ? 'auto' : overflow};
  `}

  ${justify &&
  css`
    justify-content: ${justify};
  `}

${align &&
  css`
    align-items: ${align};
  `}

  ${direction &&
  css`
    flex-direction: ${direction};
  `}

${flex &&
  css`
    flex: ${typeof flex === 'boolean' ? 1 : flex};
  `}

  ${flexWrap &&
  css`
    flex-wrap: ${typeof flexWrap === 'boolean' ? 'wrap' : flexWrap};
  `}

  ${gap &&
  typeof gap === 'boolean' &&
  css`
    gap: 16px;
  `}

${gap &&
  typeof gap === 'number' &&
  css`
    gap: ${gap}px;
  `}

${gap &&
  typeof gap === 'string' &&
  css`
    gap: ${gap};
  `}

${padding &&
  typeof padding === 'boolean' &&
  css`
    padding: 16px;
  `}

${padding &&
  typeof padding === 'number' &&
  css`
    padding: ${padding}px;
  `}

${padding &&
  typeof padding === 'string' &&
  css`
    padding: ${padding};
  `}

${margin &&
  typeof margin === 'boolean' &&
  css`
    margin: 16px;
  `}

${margin &&
  typeof margin === 'number' &&
  css`
    margin: ${margin}px;
  `}

${margin &&
  typeof margin === 'string' &&
  css`
    margin: ${margin};
  `}

${width &&
  css`
    max-width: ${typeof width === 'string' ? width : `${width}px`};
    width: ${typeof width === 'string' ? width : `${width}px`};
  `}

${height &&
  css`
    max-height: ${typeof height === 'string' ? height : `${height}px`};
    height: ${typeof height === 'string' ? height : `${height}px`};
  `}

  ${maxWidth &&
  css`
    max-width: ${typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`};
  `}

  ${maxHeight &&
  css`
    max-height: ${typeof maxHeight === 'string' ? maxHeight : `${maxHeight}px`};
  `}
`;

export const Container = styled.div<FlexProps>`
  ${flexStyle}
`;

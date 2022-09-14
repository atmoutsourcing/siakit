import styled, { css } from 'styled-components';

import { Card } from '../Card';

const sizes = {
  xs: css`
    width: 320px;
  `,
  sm: css`
    width: 480px;
  `,
  md: css`
    width: 640px;
  `,
  lg: css`
    width: 768px;
  `,
  xl: css`
    width: 1024px;
  `,
  '2xl': css`
    width: 1280px;
  `,
};

export type Size = keyof typeof sizes;

type ContainerProps = {
  size: Size;
};

export const Container = styled(Card)<ContainerProps>`
  ${({ size }) => sizes[size]};
`;

import styled, { css } from 'styled-components';

import { Card } from '../Card';
import { OverlayBase } from '../styles';

export const Overlay = styled(OverlayBase)`
  z-index: 9000;
`;

const sizes = {
  xs: css`
    width: 320px;
  `,
  sm: css`
    width: 640px;
  `,
  md: css`
    width: 768px;
  `,
  lg: css`
    width: 1024px;
  `,
  xl: css`
    width: 1280px;
  `,
  '2xl': css`
    width: 1536px;
  `,
  full: css`
    width: 100%;
    height: 100%;
    border-radius: 0;
  `,
};

export type Size = keyof typeof sizes;

type ContentProps = {
  size: Size;
};

export const Content = styled(Card)<ContentProps>`
  margin: 16px;
  display: flex;
  flex-direction: column;

  max-height: calc(100vh - 32px);

  overflow: auto;

  ${({ size }) => sizes[size]};
`;

export const ModalHeader = styled.div`
  display: flex;

  justify-content: space-between;

  strong {
    padding: 14px 16px;
  }

  button {
    margin: 8px;
  }
`;

export const Title = styled.strong`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  flex: 1;
`;

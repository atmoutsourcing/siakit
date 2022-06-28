import styled, { css } from 'styled-components';

import { Card } from '../Card';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
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
  overflow-y: auto;

  ${({ size }) => sizes[size]};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h6 {
    padding: 16px;
  }

  button {
    margin: 12px;
  }
`;

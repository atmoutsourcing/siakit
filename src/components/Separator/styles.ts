import styled, { css } from 'styled-components';

export type Direction = 'horizontal' | 'vertical';

type ContainerProps = {
  direction: Direction;
};

export const Container = styled.div<ContainerProps>`
  background-color: ${({ theme }) => theme.colors.gray[6]};

  ${({ direction }) =>
    direction === 'horizontal' &&
    css`
      height: 1px;
      width: 100%;
      margin: 4px 0;
    `}

  ${({ direction }) =>
    direction === 'vertical' &&
    css`
      width: 1px;
      height: 100%;
      margin: 0 4px;
    `}
`;

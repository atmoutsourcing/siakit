import styled, { css } from 'styled-components';

type ContainerProps = {
  cols: number;
  haveActions: boolean;
};

export const Container = styled.div<ContainerProps>`
  width: 100%;
  overflow: auto;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.gray[3]};

  > div {
    width: 100%;
    display: grid;
    position: relative;

    ${({ cols, haveActions }) =>
      haveActions
        ? css`
            grid-template-columns: repeat(${cols - 1}, 1fr) 64px;
          `
        : css`
            grid-template-columns: repeat(${cols}, 1fr);
          `}
  }
`;

type BodyCellProps = {
  align?: string;
};

export const BodyCell = styled.div<BodyCellProps>`
  white-space: nowrap;
  padding: 12px;

  border-top: 1px solid ${({ theme }) => theme.colors.gray[6]};

  display: flex;

  font-size: 0.875rem;

  ${({ align }) =>
    align === 'right' &&
    css`
      justify-content: flex-end;
    `}
`;

export const ActionCell = styled.div`
  white-space: nowrap;

  position: sticky;
  right: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[6]};
`;

type FooterCellProps = {
  isAction?: boolean;
  align: 'left' | 'right';
};

export const FooterCell = styled.div<FooterCellProps>`
  display: flex;

  white-space: nowrap;
  padding: 12px;

  position: sticky;
  bottom: 0;
  z-index: 3;

  background-color: ${({ theme }) => theme.colors.gray[3]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[6]};

  font-size: 0.875rem;
  font-weight: 600 !important;

  ${({ isAction }) =>
    isAction &&
    css`
      position: sticky;
      right: 0;
    `}

  ${({ align }) =>
    align === 'right' &&
    css`
      justify-content: flex-end;
    `}
`;

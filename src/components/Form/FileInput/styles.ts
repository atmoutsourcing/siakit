import styled, { css } from 'styled-components';

import { Flex } from '../../Flex';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;

  > div:nth-of-type(1) {
    padding: 16px 64px;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    border: 2px dashed ${({ theme }) => theme.colors.gray[7]};
    border-radius: 8px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    ${({ isErrored, theme }) =>
      isErrored &&
      css`
        background-color: ${theme.colors.red[3]};
        border-color: ${theme.colors.red[9]};
      `}
  }
`;

interface PreviewItemProps {
  imgSouce: string;
}

export const PreviewItem = styled(Flex)<PreviewItemProps>`
  > div {
    div.image {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      background-color: ${({ theme }) => theme.colors.gray[7]};
      background: ${({ imgSouce }) => `url(${imgSouce}) no-repeat center`};
      background-size: cover;
    }
  }
`;

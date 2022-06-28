import styled, { css } from 'styled-components';

type ContainerProps = {
  isSelected: boolean;
};

export const Container = styled.a<ContainerProps>`
  position: relative;
  height: 32px;
  padding-left: 12px;

  cursor: pointer;

  display: flex;
  align-items: center;

  font-size: 14px;

  color: ${({ theme }) => theme.colors.gray[9]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[4]};
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${({ theme }) => theme.colors.gray[5]};
      color: ${({ theme }) => theme.colors.gray[12]};

      &::before {
        position: absolute;
        content: '';
        width: 2px;
        border-radius: 0 2px 2px 0;
        top: 0;
        bottom: 0;
        left: 0;
        background-color: ${({ theme }) => theme.colors.gray[12]};
      }
    `}
`;

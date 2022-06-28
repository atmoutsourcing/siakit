import styled, { css } from 'styled-components';

type ContainerProps = {
  isExpanded: boolean;
};

export const Container = styled.a<ContainerProps>`
  height: 48px;

  display: flex;
  align-items: center;

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `};

  ${({ isExpanded }) =>
    isExpanded
      ? css`
          padding-left: 16px;
        `
      : css`
          justify-content: center;
        `}
`;

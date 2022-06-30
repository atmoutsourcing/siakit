import styled, { css, keyframes } from 'styled-components';

const placeholderShimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }

  100% {
    background-position: 1000px 0;
  }
`;

type BaseShimmerProps = {
  width?: number | string;
  height?: number | string;
};

const BaseShimmer = styled.div<BaseShimmerProps>`
  flex: 1;
  background: ${({ theme }) => theme.colors.gray[4]};
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.gray[4]} 0%,
    ${({ theme }) => theme.colors.gray[6]} 20%,
    ${({ theme }) => theme.colors.gray[4]} 40%,
    ${({ theme }) => theme.colors.gray[4]} 100%
  );
  background-repeat: no-repeat;
  background-size: 2000px 1000px;
  display: inline-block;
  position: relative;

  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: ${placeholderShimmer};
  -webkit-animation-timing-function: linear;

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
`;

export const Rectangle = styled(BaseShimmer)`
  border-radius: 8px;
`;

export const Ellipse = styled(BaseShimmer)`
  border-radius: 50%;
`;

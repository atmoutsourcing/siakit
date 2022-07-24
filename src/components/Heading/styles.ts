import styled, { css } from 'styled-components';

export type Size =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl';

export const Container1 = styled.h1`
  color: ${(props) => props.theme.colors.gray[12]};
  line-height: 1;
  font-size: 4.5rem;
`;

export const Container2 = styled.h2`
  color: ${(props) => props.theme.colors.gray[12]};
  line-height: 1;
  font-size: 3.75rem;
`;

export const Container3 = styled.h3`
  color: ${(props) => props.theme.colors.gray[12]};
  line-height: 1;
  font-size: 3rem;
`;

export const Container4 = styled.h4`
  color: ${(props) => props.theme.colors.gray[12]};
  line-height: 1.2;
  font-size: 2.25rem;
`;

export const Container5 = styled.h5`
  color: ${(props) => props.theme.colors.gray[12]};
  line-height: 1.2;
  font-size: 1.875rem;
`;

export const Container6 = styled.h6`
  color: ${(props) => props.theme.colors.gray[12]};
  line-height: 1.2;
  font-size: 1.25rem;
`;

type ContainerProps = {
  size: Size;
};

export const Container = styled.strong<ContainerProps>`
  color: ${(props) => props.theme.colors.gray[12]};
  line-height: 1.2;
  font-weight: 500;

  ${({ size }) =>
    size === 'md' &&
    css`
      font-size: 1rem;
    `}

  ${({ size }) =>
    size === 'sm' &&
    css`
      font-size: 0.875rem;
    `}

  ${({ size }) =>
    size === 'xs' &&
    css`
      font-size: 0.75rem;
    `}
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;

  span:nth-of-type(1) {
    margin-inline-start: -8px;
  }

  span {
    border: 4px solid ${({ theme }) => theme.colors.gray[1]};

    & + span {
      margin-left: -8px;
    }
  }
`;

export const More = styled.span`
  height: 48px;
  width: 48px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.gray[6]};

  strong {
    color: ${({ theme }) => theme.colors.gray[11]};
  }
`;

export const Hover = styled.div`
  &:hover {
    z-index: 10;
  }
`;

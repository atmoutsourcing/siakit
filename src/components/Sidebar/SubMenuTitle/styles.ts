import styled from 'styled-components';

export const Container = styled.div`
  height: 32px;

  padding: 0 0 6px 12px;

  display: flex;
  align-items: flex-end;

  color: ${({ theme }) => theme.colors.gray[8]};
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 600;
`;

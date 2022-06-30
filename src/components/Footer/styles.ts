import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 16px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  background-color: ${({ theme }) => theme.colors.gray[4]};
`;

export const FooterLeft = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

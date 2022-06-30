import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 16px;
`;

export const AvatarContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Line = styled.div`
  flex: 1;
  margin: 8px 0;

  width: 2px;
  background-color: ${({ theme }) => theme.colors.gray[6]};
`;

export const Content = styled.div`
  padding-bottom: 32px;
`;

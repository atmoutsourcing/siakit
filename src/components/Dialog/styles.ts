import styled from 'styled-components';

import { Card } from '../Card';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
`;

export const Content = styled(Card)`
  overflow-y: auto;

  width: 100%;
  max-width: 272px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 24px;

  img {
    width: 56px;
    margin-top: 8px;
    margin-bottom: 32px;
  }

  h6 {
    margin-bottom: 8px;
    text-align: center;
  }

  p {
    margin-bottom: 32px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[11]};
  }
`;

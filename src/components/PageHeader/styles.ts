import styled from 'styled-components';

import { Card } from '../Card';

export const Container = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 48px;

  border-radius: 0;

  padding: 0 8px;

  > div {
    display: flex;
    align-items: center;

    button {
      all: unset;
      box-sizing: border-box;
      cursor: pointer;

      height: 48px;

      display: flex;
      align-items: center;

      padding: 0 8px;
    }

    strong {
      margin-left: 8px;
    }
  }
`;

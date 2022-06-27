import styled from 'styled-components';

import { Colors } from '../../hooks/theme';

type ContainerProps = {
  color: Colors;
};

export const Container = styled.div<ContainerProps>`
  height: 18px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 8px;

  gap: 4px;

  background-color: ${({ theme, color }) => theme.colors[color][3]};
  color: ${({ theme, color }) => theme.colors[color][11]};
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;

  border-radius: 4px;
`;

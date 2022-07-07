import { createGlobalStyle } from 'styled-components';

import { Colors } from '.';

type GlobalStyleProps = {
  colorScheme: Colors;
};

export const GlobaStyle = createGlobalStyle<GlobalStyleProps>`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  :root {
    --rdp-cell-size: 40px;
  }

  ::-webkit-scrollbar {
    margin-bottom: 10px;
    width: 14px;
    height: 14px;
    border-radius: 24px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 24px;
    box-shadow: inset 0 0 10px 10px rgba(0, 0, 0, 0.16);
    border: solid 4px transparent;
  }

  ::selection {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme][5]};
    color: ${({ theme, colorScheme }) => theme.colors[colorScheme][12]};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background-color: ${(props) => props.theme.colors.gray[1]};
    color: ${(props) => props.theme.colors.gray[12]};
  }

  body, input, textarea, button {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  h6, h5, h4, h3, h2, h1, strong {
    font-weight: 600;
  }
`;

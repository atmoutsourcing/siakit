import { createGlobalStyle } from 'styled-components';

import { Colors } from '.';
import InterBlack from '../../assets/fonts/inter/Inter-Black.ttf';
import InterBold from '../../assets/fonts/inter/Inter-Bold.ttf';
import InterExtraBold from '../../assets/fonts/inter/Inter-ExtraBold.ttf';
import InterExtraLight from '../../assets/fonts/inter/Inter-ExtraLight.ttf';
import InterLight from '../../assets/fonts/inter/Inter-Light.ttf';
import InterMedium from '../../assets/fonts/inter/Inter-Medium.ttf';
import InterRegular from '../../assets/fonts/inter/Inter-Regular.ttf';
import InterSemiBold from '../../assets/fonts/inter/Inter-SemiBold.ttf';
import InterThin from '../../assets/fonts/inter/Inter-Thin.ttf';

type GlobalStyleProps = {
  colorScheme: Colors;
};

export const GlobaStyle = createGlobalStyle<GlobalStyleProps>`
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

  @font-face {
    font-family: 'Inter';
    src: local('Inter'), url(${InterThin}) format("truetype");
    font-weight: 100;
  }
  @font-face {
    font-family: 'Inter';
    src: local('Inter'), url(${InterExtraLight}) format("truetype");
    font-weight: 200;
  }
  @font-face {
    font-family: 'Inter';
    src: local('Inter'), url(${InterLight}) format("truetype");
    font-weight: 300;
  }
  @font-face {
    font-family: 'Inter';
    src: local('Inter'), url(${InterRegular}) format("truetype");
    font-weight: 400;
  }
  @font-face {
    font-family: 'Inter';
    src: local('Inter'), url(${InterMedium}) format("truetype");
    font-weight: 500;
  }
  @font-face {
    font-family: 'Inter';
    src: local('Inter'), url(${InterSemiBold}) format("truetype");
    font-weight: 600;
  }
  @font-face {
    font-family: 'Inter';
    src: local('Inter'), url(${InterBold}) format("truetype");
    font-weight: 700;
  }
  @font-face {
    font-family: 'Inter';
    src: local('Inter'), url(${InterExtraBold}) format("truetype");
    font-weight: 800;
  }
  @font-face {
    font-family: 'Inter';
    src: local('Inter'), url(${InterBlack}) format("truetype");
    font-weight: 900;
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

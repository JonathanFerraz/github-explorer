import { createGlobalStyle } from 'styled-components';

import GitHubBackground from '../assets/github-background.svg';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    outline: 0px;
  }

  body {
    background-color: #F0F0F5;
    background-image: url(${GitHubBackground});
    background-repeat: no-repeat;
    background-position: 70% top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  #root {
    margin: 0px auto;
    max-width: 960px;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }
`;

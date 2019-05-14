import { createGlobalStyle, theme } from "styling";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700,900"');

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${theme.fonts.primary};
    -webkit-font-smoothing: antialiased;
    color: ${theme.colors.text};
  }

  #root {
    height: 100vh;
    width: 100vw;
  }

  .Toastify__toast {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12) !important;
  }
  .Toastify__toast--success {
    background-color: ${theme.colors.success} !important;
  }
  .Toastify__toast--error {
    background-color: ${theme.colors.failure} !important;
  }
`;

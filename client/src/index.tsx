import { ErrorBoundary } from "components/ErrorBoundary";
import { GlobalStyles } from "GlobalStyles";
import React from "react";
import { render } from "react-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ThemeProvider } from "styled-components";
import { theme } from "styling";
import { App } from "./App";

const renderRoot = (Component: React.ComponentType<{}>) => {
  render(
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <ToastContainer
          position={toast.POSITION.BOTTOM_RIGHT}
          transition={Slide}
          autoClose={4000}
        />
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
      </>
    </ThemeProvider>,
    document.getElementById("root"),
  );
};

renderRoot(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    renderRoot(require("./App").App);
  });
}

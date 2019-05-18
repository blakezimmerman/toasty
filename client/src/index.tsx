import { ErrorBoundary } from "components/ErrorBoundary";
import { AuthProvider } from "contexts/auth";
import { PostProvider } from "contexts/posts";
import { WebsocketListener } from "contexts/websocket";
import { GlobalStyles } from "GlobalStyles";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
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
          <BrowserRouter>
            <AuthProvider>
              <PostProvider>
                <WebsocketListener />
                <Component />
              </PostProvider>
            </AuthProvider>
          </BrowserRouter>
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

import { Header } from "components/Header";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Comments } from "screens/Comments";
import { Feed } from "screens/Feed";
import { Login, Logout, Register } from "screens/Login";
import styled from "styling";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DefaultRoute = () => <Redirect to="/" />;

export const App = () => {
  return (
    <Wrapper>
      <Header />
      <Switch>
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/logout" component={Logout} />
        <Route exact={true} path="/register" component={Register} />
        <Route exact={true} path="/:id" component={Comments} />
        <Route exact={true} path="/" component={Feed} />
        <Route component={DefaultRoute} />
      </Switch>
    </Wrapper>
  );
};

import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import styled, { themeColor } from "styling";

const splitToastIcon = require("assets/splitToast.svg");

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 28px;
  background-color: ${themeColor("primary")};
  color: ${themeColor("primaryText")};
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3);
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const Heading = styled.h1`
  margin: 0;
  margin-left: 15px;
  font-weight: 900;
`;

const Login = styled(Link)`
  color: ${themeColor("primaryText")};
  text-decoration: none;
  font-size: 20px;
  font-weight: 900;
  border: 3px solid ${themeColor("primaryText")};
  border-radius: 10px;
  height: 40px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const Header = withRouter((props: RouteComponentProps) => {
  return (
    <Wrapper>
      <Column>
        <img src={splitToastIcon} />
        <Heading>Toasty</Heading>
      </Column>
      <Column>
        {props.location.pathname !== "/login" && <Login to="/login">Login</Login>}
      </Column>
    </Wrapper>
  );
});

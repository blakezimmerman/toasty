import React from "react";
import styled, { themeColor } from "styling";

const splitToastIcon = require("assets/splitToast.svg");

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 28px;
  background-color: ${themeColor("primary")};
  color: ${themeColor("primaryText")};
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3);
`;

const Heading = styled.h1`
  margin: 0;
  margin-left: 15px;
  font-weight: 900;
`;

export const Header = () => {
  return (
    <Wrapper>
      <img src={splitToastIcon} />
      <Heading>Toasty</Heading>
    </Wrapper>
  );
};

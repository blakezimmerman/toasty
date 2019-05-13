import React from "react";
import styled, { themeColor } from "styling";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${themeColor("primary")};
  color: ${themeColor("primaryText")};
  font-size: 1.8rem;
  font-weight: 900;
`;

export const DefaultFallback = () => <Wrapper>Something went wrong 😨</Wrapper>;

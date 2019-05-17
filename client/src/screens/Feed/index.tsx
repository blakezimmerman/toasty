import { AuthContext } from "contexts/auth";
import React, { useContext } from "react";
import styled from "styling";
import { PostInput } from "./components/PostInput";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 100%;
  max-width: 500px;
  padding: 0 15px;

  > * {
    margin-top: 20px;
  }
`;

export const Feed = () => {
  const { name, token } = useContext(AuthContext);

  return (
    <Wrapper>
      <PostInput loggedIn={!!name} token={token} />
    </Wrapper>
  );
};

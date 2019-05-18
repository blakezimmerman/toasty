import { Post } from "components/Post";
import { AuthContext } from "contexts/auth";
import { PostContext } from "contexts/posts";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
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
  margin-bottom: 20px;

  > * {
    margin-top: 20px;
  }
`;

const Message = styled.div`
  font-size: 20px;
  font-weight: 900;
  width: 100%;
  text-align: center;
  padding-top: 1rem;
`;

export const Feed = (props: RouteComponentProps) => {
  const { name, token } = useContext(AuthContext);
  const { posts, getPosts, loading } = useContext(PostContext);

  useEffect(() => {
    if (getPosts) {
      getPosts();
    }
  }, [!!getPosts]);

  const toComments = (id: string) => () => {
    props.history.push(`/${id}`);
  };

  return (
    <Wrapper>
      <PostInput loggedIn={!!name} token={token} />
      {loading && <Message>Loading...</Message>}
      {!loading && !posts.length && <Message>No posts yet</Message>}
      {posts.map((post) => (
        <Post key={post._id} post={post} onClick={toComments(post._id)} />
      ))}
    </Wrapper>
  );
};

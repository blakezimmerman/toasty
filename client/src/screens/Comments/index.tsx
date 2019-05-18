import { Post } from "components/Post";
import { AuthContext } from "contexts/auth";
import { CommentContext } from "contexts/comments";
import { PostContext } from "contexts/posts";
import { IPost } from "models/posts";
import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styling";
import { Comment } from "./components/Comment";
import { CommentInput } from "./components/CommentInput";

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

export const Comments = (props: RouteComponentProps<{ id: string }>) => {
  const { name, token } = useContext(AuthContext);
  const { getPost, loading: postsLoading } = useContext(PostContext);
  const { comments, getComments, loading: commentsLoading } = useContext(CommentContext);
  const [post, setPost] = useState<IPost | undefined>(undefined);

  const { id } = props.match.params;

  useEffect(() => {
    if (getPost) {
      getPost(id).then((fetchedPost) => setPost(fetchedPost));
    }
  }, [!!getPost]);

  useEffect(() => {
    if (getComments) {
      getComments(id);
    }
  }, [!!getComments]);

  const curComments = comments[id] || [];

  return (
    <Wrapper>
      {postsLoading || (commentsLoading && <Message>Loading...</Message>)}
      {post && <Post post={post} commentCount={curComments.length || undefined} />}
      <CommentInput loggedIn={!!name} token={token} postId={id} />
      {curComments
        .sort((a, b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf())
        .map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </Wrapper>
  );
};

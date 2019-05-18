import axios from "axios";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { useInput } from "hooks/useInput";
import React from "react";
import { toast } from "react-toastify";
import styled from "styling";

const Wrapper = styled.div`
  display: flex;

  ${Input} {
    width: 100%;
  }

  ${Button} {
    margin-left: 20px;
  }
`;

interface IProps {
  postId: string;
  loggedIn: boolean;
  token?: string;
}

export const CommentInput = (props: IProps) => {
  const [comment, setComment] = useInput("");

  const createComment = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/v1/comments/post/${props.postId}`,
        { content: comment },
        { headers: { Authorization: `Bearer ${props.token}` } },
      );
      toast.success("Comment created successfully");
      setComment("");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  if (props.loggedIn) {
    return (
      <Wrapper>
        <Input placeholder="Comment" value={comment} onChange={setComment} />
        <Button disabled={!comment} onClick={createComment}>
          Post
        </Button>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Input placeholder="You must log in to comment" disabled={true} />
        <Button disabled={true}>Post</Button>
      </Wrapper>
    );
  }
};

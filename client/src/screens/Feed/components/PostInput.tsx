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

const Rows = styled.div`
  display: flex;
  flex-direction: column;

  > ${Input} {
    margin-top: 10px;
  }
`;

interface IProps {
  loggedIn: boolean;
  token?: string;
}

export const PostInput = (props: IProps) => {
  const [imageUrl, setImageUrl] = useInput("");
  const [content, setContent] = useInput("");

  const createPost = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/posts",
        { imageUrl, content },
        { headers: { Authorization: `Bearer ${props.token}` } },
      );
      toast.success("Post created successfully");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  if (props.loggedIn) {
    return (
      <Rows>
        <Wrapper>
          <Input placeholder="Image URL" value={imageUrl} onChange={setImageUrl} />
          <Button disabled={!imageUrl || !content} onClick={createPost}>
            Post
          </Button>
        </Wrapper>
        <Input
          placeholder="Say something about this image"
          value={content}
          onChange={setContent}
        />
      </Rows>
    );
  } else {
    return (
      <Wrapper>
        <Input placeholder="You must log in to post" disabled={true} />
        <Button disabled={true}>Post</Button>
      </Wrapper>
    );
  }
};

import { IPost } from "models/posts";
import React from "react";
import styled, { themeColor } from "styling";

const toastIcon = require("assets/toast.svg");
const notToastIcon = require("assets/notToast.svg");

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 10px;
  }
`;

const Rating = styled.div<{ confidence: number }>`
  :after {
    font-weight: 900;
    font-size: 20px;
    color: ${({ confidence, theme }) =>
      confidence > 0.7 ? theme.colors.success : theme.colors.failure};
    content: '${({ confidence }) => (confidence * 100).toFixed()}% Toast';
  }
`;

const Image = styled.img`
  margin: 10px 0;
  object-fit: contain;
  width: 100%;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Submission = styled.div`
  font-weight: bold;
`;

const Accent = styled.span`
  color: ${themeColor("primary")};
`;

const Comments = styled.div``;

interface IProps {
  post: IPost;
}

export const Post = ({ post }: IProps) => {
  return (
    <Wrapper>
      <RatingRow>
        <img
          src={post.toastConfidence > 0.7 ? toastIcon : notToastIcon}
          alt="toast icon"
        />
        <Rating confidence={post.toastConfidence} />
      </RatingRow>
      <Image src={post.imageUrl} alt="post image" />
      <Content>{post.content}</Content>
      <DetailRow>
        <Submission>
          Submitted by <Accent>{post.user}</Accent>
        </Submission>
        <Comments>
          {post.comments.length}
          {post.comments.length === 1 ? " comment" : " comments"}
        </Comments>
      </DetailRow>
    </Wrapper>
  );
};

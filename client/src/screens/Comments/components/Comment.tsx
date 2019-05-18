import { IComment } from "models/comments";
import React from "react";
import styled, { themeColor } from "styling";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  ${(props) => "onClick" in props && "cursor: pointer;"}
`;

const Content = styled.div`
  margin-bottom: 10px;
`;

const Submission = styled.div`
  font-weight: bold;
`;

const Accent = styled.span`
  color: ${themeColor("primary")};
`;

interface IProps {
  comment: IComment;
}

export const Comment = ({ comment }: IProps) => {
  return (
    <Wrapper>
      <Content>{comment.content}</Content>
      <Submission>
        Submitted by <Accent>{comment.user}</Accent>
      </Submission>
    </Wrapper>
  );
};

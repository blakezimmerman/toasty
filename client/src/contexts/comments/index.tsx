import axios from "axios";
import { IComment } from "models/comments";
import React, { useState } from "react";
import { toast } from "react-toastify";

export interface ICommentContext {
  comments: Record<string, IComment[]>;
  getComments?: (postId: string) => void;
  appendComment?: (postId: string, comment: IComment) => void;
  loading: boolean;
}

export const CommentContext = React.createContext<ICommentContext>({
  comments: {},
  getComments: undefined,
  appendComment: undefined,
  loading: false,
});

interface IProps {
  children: React.ReactNode;
}

export const CommentProvider = (props: IProps) => {
  const [comments, setComments] = useState<Record<string, IComment[]>>({});
  const [loading, setLoading] = useState(false);

  const getComments = async (postId: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.API}/api/v1/comments/post/${postId}`,
      );
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: data,
      }));
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const appendComment = (postId: string, comment: IComment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: [...prevComments[postId], comment],
    }));
  };

  return (
    <CommentContext.Provider value={{ comments, getComments, appendComment, loading }}>
      {props.children}
    </CommentContext.Provider>
  );
};

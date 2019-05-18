import { CommentContext } from "contexts/comments";
import { PostContext } from "contexts/posts";
import { IComment } from "models/comments";
import { IPost } from "models/posts";
import { useContext, useEffect, useState } from "react";
import openSocket from "socket.io-client";

export const WebsocketListener = () => {
  const { appendPost } = useContext(PostContext);
  const { appendComment } = useContext(CommentContext);
  const [socket] = useState(openSocket("http://localhost:5000"));

  useEffect(() => {
    // Set up callbacks to handle new messages
    socket.on("newPost", (newPost: IPost) => {
      if (appendPost) {
        appendPost(newPost);
      }
    });

    socket.on(
      "newComment",
      ({ postId, newComment }: { postId: string; newComment: IComment }) => {
        if (appendComment) {
          appendComment(postId, newComment);
        }
      },
    );
  }, [!!appendPost && !!appendComment]);

  return null;
};

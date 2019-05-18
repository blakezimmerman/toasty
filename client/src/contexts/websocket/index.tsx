import { PostContext } from "contexts/posts";
import { IPost } from "models/posts";
import { useContext, useEffect, useState } from "react";
import openSocket from "socket.io-client";

export const WebsocketListener = () => {
  const { appendPost } = useContext(PostContext);
  const [socket] = useState(openSocket("http://localhost:5000"));

  useEffect(() => {
    // Set up callbacks to handle new messages
    socket.on("newPost", (newPost: IPost) => {
      if (appendPost) {
        appendPost(newPost);
      }
    });
  }, [appendPost]);

  return null;
};

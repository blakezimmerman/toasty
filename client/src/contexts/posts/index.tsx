import axios from "axios";
import { IPost } from "models/posts";
import React, { useState } from "react";
import { toast } from "react-toastify";

export interface IPostContext {
  posts: IPost[];
  getPosts?: () => void;
  getPost?: (id: string) => Promise<IPost | undefined>;
  appendPost?: (post: IPost) => void;
  loading: boolean;
}

export const PostContext = React.createContext<IPostContext>({
  posts: [],
  getPosts: undefined,
  getPost: undefined,
  appendPost: undefined,
  loading: false,
});

interface IProps {
  children: React.ReactNode;
}

export const PostProvider = (props: IProps) => {
  const [posts, setPosts] = useState<Record<string, IPost>>({});
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.API}/api/v1/posts`);
      const newPosts = data.reduce((acc: Record<string, IPost>, post: IPost) => {
        acc[post._id] = post;
        return acc;
      }, {});
      setPosts(newPosts);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const getPost = async (id: string) => {
    setLoading(true);
    if (posts[id]) {
      setLoading(false);
      return posts[id];
    }

    try {
      const { data } = await axios.get(`${process.env.API}/api/v1/posts/${id}`);
      setLoading(false);
      return data as IPost;
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      return undefined;
    }
  };

  const appendPost = (post: IPost) => {
    setPosts((prevPosts) => ({ ...prevPosts, [post._id]: post }));
  };

  const sortedPosts = Object.values(posts).sort(
    (a, b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf(),
  );

  return (
    <PostContext.Provider
      value={{ posts: sortedPosts, getPosts, getPost, appendPost, loading }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

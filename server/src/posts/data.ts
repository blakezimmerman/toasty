import { postCollection } from "../mongo/collections";
import { IPost } from "./models";

export const createPost = async (post: IPost) => {
  try {
    const collection = await postCollection();
    const newPost: IPost = {
      ...post,
    };
    return collection.insertOne(newPost);
  } catch (error) {
    throw new Error(error);
  }
};

export const getPost = async (_id: string): Promise<IPost | null> => {
  try {
    const collection = await postCollection();
    const post = await collection.findOne<IPost>({ _id });
    return post
      ? {
          _id: post._id,
          user: post.user,
          content: post.content,
          imageUrl: post.imageUrl,
          toastConfidence: post.toastConfidence,
          comments: post.comments,
          timestamp: post.timestamp,
        }
      : null;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPosts = async () => {
  try {
    const collection = await postCollection();
    const postsData = await collection.find().toArray();
    let posts = [];
    for(let i = 0; i < postsData.length; i++) {
      posts.push({
                  _id: postsData[i]._id,
                  user: postsData[i].user,
                  content: postsData[i].content,
                  imageUrl: postsData[i].imageUrl,
                  toastConfidence: postsData[i].toastConfidence,
                  comments: postsData[i].comments,
                  timestamp: postsData[i].timestamp,
                })
    }
    return posts;
  } catch (error) {
    throw new Error(error);
  }
};

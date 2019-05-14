import { postCollection } from "../mongo/collections";
import { IUser } from "../users/models";
import { IPost } from "./models";

export const createPost = async (post: IPost) => {
  try {
    const collection = await postCollection();
    const newPost: IPost = {
      ...post
    };
    return collection.insertOne(newPost);

  } catch (error) {
    throw new Error(error);
  }
};

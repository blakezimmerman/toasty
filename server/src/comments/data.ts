import { commentCollection, postCollection } from "../mongo/collections";
import { getPost } from "../posts/data";
import { IComment } from "./models";

export const createComment = async (comment: IComment) => {
  try {
    const collection = await commentCollection();
    const newComment: IComment = {
      ...comment,
    };

    const pCollection = await postCollection();
    const post = await getPost(newComment.post);

    if (post) {
      post.comments.push(newComment._id);
      pCollection.save(post);
    }

    return collection.insertOne(newComment);
  } catch (error) {
    throw new Error(error);
  }
};

export const getComment = async (id: string): Promise<IComment | null> => {
  try {
    const collection = await commentCollection();
    const comment = await collection.findOne<IComment>({ _id: id });
    return comment
      ? {
          _id: comment._id,
          user: comment.user,
          post: comment.post,
          content: comment.content,
          timestamp: comment.timestamp,
        }
      : null;
  } catch (error) {
    throw new Error(error);
  }
};

export const getComments = async (post: string): Promise<any> => {
  try {
    const collection = await commentCollection();
    const comments = await collection.find({ post }).toArray();
    return comments;
  } catch (error) {
    throw new Error(error);
  }
};

import { commentCollection } from "../mongo/collections";
import { IComment } from "./models";

export const createComment = async (comment: IComment) => {
  try {
    const collection = await commentCollection();
    const newComment: IComment = {
      ...comment,
    };
    return collection.insertOne(newComment);
  } catch (error) {
    throw new Error(error);
  }
};

export const getComment = async (_id: string): Promise<IComment | null> => {
  try {
    const collection = await commentCollection();
    const comment = await collection.findOne<IComment>({ _id });
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
    const commentsData = await collection.find({ post }).toArray();
    let comments = [];
    for(let i = 0; i < commentsData.length; i++) {
      comments.push({
                  _id: commentsData[i]._id,
                  user: commentsData[i].user,
                  post: commentsData[i].post,
                  content: commentsData[i].content,
                  timestamp: commentsData[i].timestamp,
                })
    }
    return comments;
  } catch (error) {
    throw new Error(error);
  }
};

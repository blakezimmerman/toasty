import config from "config";
import express from "express";
import { ObjectId } from "mongodb";
import { createComment, getComment, getComments } from "./data";
import { IComment } from "./models";
import { Response } from "express";
import { IUserRequest } from "../users/models";
import { pubSub } from "../redis";

const router = express.Router();

const generateComment = async (
  user: string,
  post: string,
  content: string,
): Promise<IComment> => {
  return {
    _id: new ObjectId().toHexString(),
    user: user,
    post: post,
    content: content,
    timestamp: new Date().toISOString(),
  };
};

router.post("/post/:id", async (req: IUserRequest, res: Response) => {
  if (req.user) {
    let comment;

    try {
      comment = await generateComment(req.user.name, req.params.id, req.body.content);
    } catch (error) {
      res.status(500).json(error.message);
      return;
    }

    try {
      const writeOp = await createComment(comment);
      if (writeOp.insertedCount > 0) {

        pubSub.emit(`comment:success:${comment._id}`, {
          requestId: comment._id,
          data: {
                  _id: comment._id,
                  user: comment.user,
                  post: comment.post,
                  content: comment.content,
                  timestamp: comment.timestamp,
                },
          eventName: "comment"
        });

        res.json(comment);
      } else {
        res.status(500).json("Unable to create comment on post, please try again later");
      }
    } catch (error) {
      res.status(500).json("Unable to create comment on post, please try again later");
    }
  } else {
    res.status(401).json("User has not been logged in.");
  }
});

router.get("/:id", async (req, res) => {
  let comment;

  try {
    comment = await getComment(req.params.id);
  } catch (error) {
    res.status(500).json(`Unable to to get comment with _id of '${ req.params.id }'`);
    return;
  }

  res.json(comment);
});

router.get("/post/:id", async (req, res) => {
  let comments;

  try {
    comments = await getComments(req.params.id);
  } catch (error) {
    res.status(500).json(`Unable to to get post's comments with _id of '${ req.params.id }'`);
    return;
  }

  res.json(comments);
});

export { router as commentsRouter };

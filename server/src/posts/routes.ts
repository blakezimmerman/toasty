import config from "config";
import express, { Response } from "express";
import { ObjectId } from "mongodb";
import { sendMessage } from "../redis";
import { IUserRequest } from "../users/models";
import { createPost, getPost, getPosts } from "./data";
import { IPost } from "./models";

const Clarifai = require("clarifai");
const clarifaiKey = config.get<string>("clarifaiKey");
const app = new Clarifai.App({
  apiKey: clarifaiKey,
});

async function conceptProb(imageUrl: string, conceptName: string) {
  try {
    let probability = 0;
    const model = await app.models.initModel({
      id: Clarifai.GENERAL_MODEL,
      version: "aa7f35c01e0642fda5cf400f543e7c40",
    });
    const response = await model.predict(imageUrl);
    const concepts = response.outputs[0].data.concepts;

    for (const i in concepts) {
      if (concepts[i].name === conceptName) {
        probability = concepts[i].value;
        break;
      }
    }
    return probability;
  } catch (error) {
    throw new Error(error);
  }
}

const router = express.Router();

const generatePost = async (
  user: string,
  content: string,
  imageUrl: string,
): Promise<IPost> => {
  return {
    _id: new ObjectId().toHexString(),
    user,
    content,
    imageUrl,
    toastConfidence: await conceptProb(imageUrl, "toast"),
    comments: [],
    timestamp: new Date().toISOString(),
  };
};

router.post("/", async (req: IUserRequest, res: Response) => {
  if (req.user) {
    let post;

    try {
      post = await generatePost(req.user, req.body.content, req.body.imageUrl);
    } catch (error) {
      res.status(500).json(error.message);
      return;
    }

    try {
      const writeOp = await createPost(post);
      if (writeOp.insertedCount > 0) {
        await sendMessage("newPost", post);
        res.json(post);
      } else {
        res.status(500).json("Unable to create post, please try again later");
      }
    } catch (error) {
      res.status(500).json("Unable to create post, please try again later");
    }
  } else {
    res.status(401).json("User has not been logged in.");
  }
});

router.get("/:id", async (req, res) => {
  let post;

  try {
    post = await getPost(req.params.id);
  } catch (error) {
    res.status(500).json(`Unable to to get post with _id of '${req.params.id}'`);
    return;
  }

  res.json(post);
});

router.get("/", async (req, res) => {
  let posts;

  try {
    posts = await getPosts();
  } catch (error) {
    res.status(500).json("Unable to get posts.");
    return;
  }

  res.json(posts);
});

export { router as postsRouter };

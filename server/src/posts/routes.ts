import express from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { SECRET } from "..";
import { createPost } from "./data";
import { IPost } from "./models";

const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.CLARIFAI
});

async function conceptProb(imageURL: string, conceptName: String) {
  try {
    var probability = 0
    var concepts = await app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
                    .then((generalModel: any) => {
                      return generalModel.predict(imageURL);
                    })
                    .then((response: any) => {
                      return response['outputs'][0]['data']['concepts']
                    })
    for(var i in concepts) {
        if(concepts[i].name === conceptName) {
          probability = concepts[i].value
          break
        }
    }
    return probability
  } catch (error) {
    throw new Error(error);
  }
}

const router = express.Router();

const checkToken = (token: string) => jwt.verify(token, SECRET);

const generatePost = async (user: string, content: string, imageURL: string): Promise<IPost> => {
  return {
    _id: new ObjectId().toHexString(),
    user: user,
    content: content,
    imageUrl: imageURL,
    toastConfidence: await conceptProb(imageURL, "toast"),
    comments: []
  };
};

router.post("/post", async (req, res) => {
    if(!(req.body.token && checkToken(req.body.token))) {
      res.status(500).json("User has not been authenticated.");
    }

    let post;

    try {
      post = await generatePost(req.body.user, req.body.content, req.body.imageURL);
    } catch (error) {
      res.status(500).json(error.message);
      return;
    }

    try {
      const writeOp = await createPost(post);
      if (writeOp.insertedCount > 0) {
        res.json(`Post created successfully`);
      } else {
        res.status(500).json("Unable to create post, please try again later");
      }
    } catch (error) {
      res.status(500).json("Unable to create post, please try again later");
    }
});

export { router as postsRouter };

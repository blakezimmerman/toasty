import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import jwt from "express-jwt";
import { createServer } from "http";
import path from "path";
import socketIO from "socket.io";
import { registerRoutes } from "./routes";

import { pubSub, sendMessage } from "./redis";

import { IPost } from "./posts/models";
import { IComment } from "./comments/models";

const app = express();
const server = createServer(app);
const ws = socketIO.listen(server);

export const PORT = 5000;
export const PUBLIC_PATH = path.resolve(__dirname, "../../", "client", "dist");
export const SECRET = "Not quite a secret, oops.";

var postSockets: any[] = []
var commentSockets: any[] = []

// Set up websocket server
ws.on("connection", (connection: any) => {
  // Do websocket stuff
  connection.on("post", async (data: IPost) => {
    if(!(connection in postSockets)) {
      postSockets.push(connection);
    }

    for(let i = 0; i < postSockets.length; i++) {
      postSockets[i].emit("post", {
        _id: data._id,
        user: data.user,
        content: data.content,
        imageUrl: data.imageUrl,
        toastConfidence: data.toastConfidence,
        comments: data.comments,
        timestamp: data.timestamp,
      })
    }
  });

  connection.on("comment", async (data: IComment) => {
    if(!(connection in commentSockets)) {
      commentSockets.push(connection);
    }

    for(let i = 0; i < commentSockets.length; i++) {
      commentSockets[i].emit("comment", {
        _id: data._id,
        user: data.user,
        post: data.post,
        content: data.content,
        timestamp: data.timestamp,
      })
    }
  });
});

// Allow cross-origin requests
app.use(cors());

// Identify users when they connect
app.use(jwt({ secret: SECRET, credentialsRequired: false }));

// Register REST routes
app.use(bodyParser.json());
registerRoutes(app);

// Serve client
const expressStaticGzip = require("express-static-gzip");
app.use(expressStaticGzip(PUBLIC_PATH));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(PUBLIC_PATH, "index.html"));
});

// Start listening
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

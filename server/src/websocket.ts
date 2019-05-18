import { Server } from "socket.io";
import { IComment } from "./comments/models";
import { IPost } from "./posts/models";
import { pubSub } from "./redis";

export const registerPubSubListener = (ws: Server) => {
  pubSub.on<IPost>("newPost:request", async (newPost) => {
    ws.emit("newPost", newPost);
  });

  pubSub.on<IComment>("newComment:request", async (newComment) => {
    ws.emit("newComment", newComment);
  });
};

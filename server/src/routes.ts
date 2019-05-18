import { Express } from "express";
import { authRouter } from "./auth/routes";
import { commentsRouter } from "./comments/routes";
import { postsRouter } from "./posts/routes";

export const registerRoutes = (app: Express) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/posts", postsRouter);
  app.use("/api/v1/comments", commentsRouter);
};

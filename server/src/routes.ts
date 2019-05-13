import { Express } from "express";
import { authRouter } from "./auth/routes";

export const registerRoutes = (app: Express) => {
  app.use("/api/v1/auth", authRouter);
};

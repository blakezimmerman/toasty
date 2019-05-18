import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import jwt from "express-jwt";
import { createServer } from "http";
import path from "path";
import socketIO from "socket.io";
import { registerRoutes } from "./routes";
import { registerPubSubListener } from "./websocket";

const app = express();
const server = createServer(app);
const ws = socketIO.listen(server);

export const PORT = 5000;
export const PUBLIC_PATH = path.resolve(__dirname, "../../", "client", "dist");
export const SECRET = "Not quite a secret, oops.";

// Register pub-sub listeners
registerPubSubListener(ws);

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

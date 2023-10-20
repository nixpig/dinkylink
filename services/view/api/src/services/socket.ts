import { Server as WSServer } from "ws";
import { subscriber } from "./subscriber";
import dotenv from "dotenv";
import url from "url";

dotenv.config();

const clients = {};

export const startWebSocketServer = async () => {
  const wss = new WSServer({ port: process.env.VIEW_API_PORT });

  console.log("[view] created web socket server");

  wss.on("connection", (ws, req) => {
    console.log("[view] received web socket connection");

    const {
      query: { uuid },
    } = url.parse(req.url, true);

    clients[`${uuid}`] = ws;

    console.log(`[view] uuid in connection URL: ${uuid}`);

    console.log("[view] client connected to socket");

    subscriber.subscribe("link_created", (message) => {
      clients[JSON.parse(message).uuid].send(message);
    });

    ws.on("close", () => {
      subscriber.unsubscribe();
      console.log("[view] client disconnected from socket");
    });

    ws.on("error", (e) => {
      console.error(`[view] an error occurred in socket: ${JSON.stringify(e)}`);
    });
  });
};

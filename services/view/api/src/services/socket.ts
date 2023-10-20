import { Server as WSServer } from "ws";
import { subscriber } from "./subscriber";
import dotenv from "dotenv";

dotenv.config();

export const startWebSocketServer = async () => {
  const wss = new WSServer({ port: process.env.VIEW_API_PORT });

  wss.on("connection", (ws) => {
    console.log("[view] client connected to socket");

    subscriber.subscribe("link_created", (message) => {
      wss.broadcast(message);
    });

    ws.on("close", () => {
      subscriber.unsubscribe();
      console.log("[view] client disconnected from socket");
    });

    ws.on("error", (e) => {
      console.error(`[view] an error occurred in socket: ${JSON.stringify(e)}`);
    });
  });

  wss.broadcast = (message) => {
    console.log(`[view] broadcasting data over socket: ${message}`);

    for (let client of wss.clients) {
      client.send(message);
    }
  };
};

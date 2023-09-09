import { Server as WSServer } from "ws";
import { subscriber } from "./subscriber";
import { VIEW_PORT } from "./environment";

export const startWSS = async () => {
  const wss = new WSServer({ port: VIEW_PORT });

  wss.on("connection", (ws) => {
    console.log("[view] a client connected");

    subscriber.subscribe("link_created", (message) => {
      wss.broadcast(message);
    });

    ws.on("close", () => {
      subscriber.unsubscribe();
      console.log("[view] a client disconnected");
    });

    ws.on("error", () => {
      console.error("[view] an error occurred with a client");
    });
  });

  wss.broadcast = (message) => {
    console.log(`[view] broadcasting data: ${message}`);

    for (let client of wss.clients) {
      client.send(message);
    }
  };
};

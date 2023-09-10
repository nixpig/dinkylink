import { Server as WSServer } from "ws";
import { VIEW_PORT } from "./environment";

export const wss = new WSServer({ port: VIEW_PORT });

export const startWSS = async () => {
  wss.on("connection", async (ws) => {
    console.log("[consumer] a client connected");

    ws.on("close", () => {
      console.log("[consumer] a client disconnected");
    });

    ws.on("error", () => {
      console.error("[consumer] an error occurred with a client");
    });
  });

  wss.broadcast = (message) => {
    console.log(`[consumer] broadcasting data: ${message}`);

    for (let client of wss.clients) {
      client.send(message);
    }
  };
};

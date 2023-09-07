import { Server as WSS } from "ws";

import { WS_PORT } from "./environment";

const wss = new WSS({ port: WS_PORT });

export const start = () => {
  const broadcastVisitorCount = () =>
    wss.broadcast(`Vistor count: ${wss.clients.size}`);

  wss.on("connection", (ws) => {
    broadcastVisitorCount();

    ws.on("close", () => {
      broadcastVisitorCount();

      console.log("A client has disconnected");
    });

    ws.on("error", () => {
      console.error("some error...");
    });
  });

  wss.broadcast = (data) => {
    console.log("Broadcasting: ", data);

    for (let client of wss.clients) {
      client.send(data);
    }
  };
};

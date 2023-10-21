import { Server as WSServer } from "ws";
import { subscriber } from "./subscriber";
import url from "url";

const clients = {};

export const startWebSocketServer = async () => {
  const wss = new WSServer({ port: process.env.VIEW_API_PORT });

  console.log("[view] created web socket server");

  subscriber.subscribe("link_created", (message) => {
    clients[JSON.parse(message).uuid].send(message);
  });

  wss.on("connection", (ws, req) => {
    const {
      query: { uuid },
    } = url.parse(req.url, true);

    console.log(
      `[view] received web socket connection from client uuid: ${uuid}`
    );

    clients[`${uuid}`] = ws;

    console.log(`[view] uuid in connection URL: ${uuid}`);

    console.log("[view] client connected to socket");

    ws.on("close", () => {
      console.log("[view] client disconnected from socket");
    });

    ws.on("error", (e) => {
      console.error(`[view] an error occurred in socket: ${e.message}`);
    });
  });
};

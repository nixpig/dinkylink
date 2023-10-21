import dotenv from "dotenv";
import { Server as WSServer } from "ws";
import { createClient, commandOptions } from "redis";

const STREAM_KEY = "link_visits";
const GROUP_NAME = "link_visits_group";
const CONSUMER_NAME = "stats_consumer";
const READ_MAX_COUNT = 100;
const ID_POSITION = "0";

dotenv.config();

startWebSocketServer(listenToStream);
connectToMessageBus();

async function connectToMessageBus() {
  const connectionString = `redis://${process.env.BUS_DOCKER_HOST}:${process.env.BUS_PORT}`;
  const client = createClient({ url: connectionString });

  const subscriber = client.duplicate();

  await subscriber.connect();
  await client.connect();

  subscriber.subscribe("link_visited", (message) => {
    const id = "*";

    console.log(`[stats] received message: ${message}`);

    console.log(`[stats] pushing to stream: ${message}`);
    client.xAdd(STREAM_KEY, id, { message });
  });
}

function startWebSocketServer(listener) {
  const wss = new WSServer({ port: process.env.STATS_API_PORT });

  wss.on("connection", async (ws) => {
    console.log(`[stats] client connected to socket`);
    listener((message, messageId) => wss.broadcast(`${messageId}: ${message}`));

    ws.on("close", () => {
      console.log(`[stats] client disconnected from socket`);
    });

    ws.on("error", (e) => {
      console.error(`[stats] an error occurred in socket: ${e.message}`);
    });
  });

  wss.broadcast = (message) => {
    console.log(`[stats] broadcasting data: ${message}`);

    const id = "*";

    for (let client of wss.clients) {
      client.send(message);
    }
  };
}

async function listenToStream(onMessage) {
  const client = createClient({ url: process.env.STREAM_DOCKER_HOST });

  const consumer = client;
  console.log(`[stats] trying to listen to stream: ${STREAM_KEY}`);
  await client.connect();

  const consumerExists = await consumer.exists(STREAM_KEY);

  if (!consumerExists) {
    await client.xGroupCreate(STREAM_KEY, GROUP_NAME, ID_POSITION, {
      MKSTREAM: true,
    });
  }

  while (true) {
    console.log(`[stats] waiting for data in stream: ${STREAM_KEY}`);

    const dataRead = await consumer.xReadGroup(
      commandOptions({ isolated: true }),
      GROUP_NAME,
      CONSUMER_NAME,
      [{ key: STREAM_KEY, id: ">" }],
      {
        COUNT: READ_MAX_COUNT,
        BLOCK: 0,
      }
    );

    for (let data of dataRead) {
      console.log(`[stats] data in stream: ${STREAM_KEY}`);
      for (let item of data.messages) {
        console.log(`[stats] processing item: ${JSON.stringify(item)}`);
        await onMessage(item.message, item.id);
        console.log(`[stats] acking item: ${JSON.stringify(item)}`);

        consumer.xAck(STREAM_KEY, GROUP_NAME, item.id);
      }
    }
  }
}

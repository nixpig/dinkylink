import { createClient, commandOptions } from "redis";
import { STREAM_CONNECTION_STRING } from "./environment";

const STREAM_KEY = "link_visits";
const GROUP_NAME = "link_visits_group";
const CONSUMER_NAME = "stats_consumer";
const READ_MAX_COUNT = 100;
const ID_POSITION = "0";

export const listenToStream = async (
  onMessage: (message: any, messageId: string) => Promise<void>
) => {
  const client = createClient({ url: STREAM_CONNECTION_STRING });
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
};

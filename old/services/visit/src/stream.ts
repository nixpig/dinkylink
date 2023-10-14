import { createClient } from "redis";
import { STREAM_CONNECTION_STRING } from "./environment";

const STREAM_KEY = "link_visits";

export const stream = createClient({
  url: STREAM_CONNECTION_STRING,
});

export const addVisitToStream = async (visit: { shortCode: string }) => {
  const id = "*";

  console.log(`[visit] Adding visit to stream: ${JSON.stringify(visit)}`);
  await stream.xAdd(STREAM_KEY, id, { shortCode: visit.shortCode });
  console.log(`[visit] Added visit to stream: ${JSON.stringify(visit)}`);
};

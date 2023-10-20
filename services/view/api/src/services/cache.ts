import { createClient } from "redis";
import { subscriber } from "./subscriber";

const connectionString = `redis://${process.env.CACHE_DOCKER_HOST}:${process.env.CACHE_PORT}`;

export const cache = createClient({
  url: connectionString,
});

subscriber.subscribe("link_created", (link) => {
  const data = JSON.parse(link);

  console.log(`[view] caching { "${data.shortCode}": "${data.targetUrl}" }`);
  cache.set(data.shortCode, data.targetUrl);
});

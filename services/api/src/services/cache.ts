import { createClient } from "redis";
import {
  CACHE_HOST,
  CACHE_PORT,
  CACHE_USER,
  CACHE_PASSWORD,
} from "../environment";

export const client = createClient({
  // url: `redis://${CACHE_USER}:${CACHE_PASSWORD}@${CACHE_HOST}:${CACHE_PORT}`,
  url: `redis://${CACHE_HOST}:${CACHE_PORT}`,
});

// (async () => {
//   try {
//     await client.connect();
//     await client.set("foo", "bar");
//     const value = await client.get("foo");
//     console.log("🚀 value", value);
//   } catch (error: any) {
//     console.error(`⚠️  [api] failed to connect to cache: ${error?.message}`);
//     process.exit(1);
//   }
// })();

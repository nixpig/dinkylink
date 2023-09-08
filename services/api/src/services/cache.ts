import { createClient } from "redis";
import { CACHE_CONNECTION_STRING } from "../environment";

export const cache = createClient({
  url: CACHE_CONNECTION_STRING,
});

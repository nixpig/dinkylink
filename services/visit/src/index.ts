import { startServer } from "./server";
import { database } from "./database";
import { cache } from "./cache";
import { stream } from "./stream";

const init = async () => {
  try {
    await startServer();
    console.log("[visit] server started successfully");

    await database.connect();
    console.log("[visit] database connected successfully");

    await cache.connect();
    console.log("[visit] cache connected successfully");

    await stream.connect();
    console.log("[visit] stream connected successfully");
  } catch (error) {
    console.error(`[visit] failed to start: ${error.message}`);
    process.exit(1);
  }
};

init();

import { startServer } from "./server";
import { database } from "./services/database";
import { cache } from "./services/cache";
import { broker } from "./services/broker";

const init = async () => {
  try {
    await startServer();
    console.log(`[create] server running`);

    await database.connect();
    console.log(`[create] connected to database`);

    await cache.connect();
    console.log(`[create] connected to cache`);

    await broker.connect();
    console.log(`[create] connected to broker`);
  } catch (error) {
    console.error(`[create] server error ${error?.message}`);
    process.exit(1);
  }
};

init();

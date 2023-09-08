import { server } from "./server";
import { database } from "./services/database";
import { cache } from "./services/cache";
import { broker } from "./services/broker";

const init = async () => {
  try {
    await server.start();
    console.log(`⚡️ [api] server running`);
  } catch (error) {
    console.error(`⚡️ [api] server error ${error?.message}`);
    process.exit(1);
  }

  try {
    await database.connect();
    console.log(`🗃️  [database] connected to database`);
  } catch (error) {
    console.error(
      `🗃️  [database] error connecting to database ${error?.message}`
    );
    process.exit(1);
  }

  try {
    await cache.connect();

    console.log(`📑 [cache] connected to cache`);
  } catch (error) {
    console.error(`📑 [cache] error connecting to cache ${error?.message}`);
    process.exit(1);
  }

  try {
    await broker.connect();

    console.log(`📮 [broker] connected to broker`);
  } catch (error) {
    console.error(`📮 [broker] error connecting to broker ${error?.message}`);
    process.exit(1);
  }
};

init();

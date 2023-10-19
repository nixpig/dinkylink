import { startServer } from "./server";
import { database } from "./services/database";
import { bus } from "./services/bus";

const init = async () => {
  try {
    await database.connect();
    console.log("[create] connected to database");
  } catch (e) {
    console.error(
      `[create] failed to start database: ${JSON.stringify(e.message)}`
    );
  }

  try {
    await bus.connect();
    console.log(`[create] bus connected`);
  } catch (e) {
    console.error(`[create] failed to connect to bus: ${e.message}`);
  }

  try {
    const server = await startServer();
    console.log(
      `[create] server started on port ${JSON.stringify(server.port)}`
    );
  } catch (e) {
    console.error(
      `[create] failed to start server: ${JSON.stringify(e.message)}`
    );
  }
};

init();

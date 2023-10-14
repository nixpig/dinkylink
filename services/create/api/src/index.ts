import { startServer } from "./server";
import { database } from "./services/database";

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

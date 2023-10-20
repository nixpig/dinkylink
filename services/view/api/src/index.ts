import { subscriber } from "./services/subscriber";
import { cache } from "./services/cache";
import { bus } from "./services/bus";
import { startWebSocketServer } from "./services/socket";
import { startServer } from "./server";

const init = async () => {
  try {
    const server = await startServer();
    console.log(
      `[view] express server started on port: ${JSON.stringify(server.port)}`
    );
  } catch (e) {
    console.error(`[view] failed to start express server: ${e.message}`);
  }

  try {
    await subscriber.connect();
    console.log(`[view] subscriber connected`);
  } catch (e) {
    console.error(`[view] subscriber failed to connect: ${e.message}`);
  }

  try {
    await bus.connect();
    console.log("[view] connected to message bus");
  } catch (e) {
    console.error("[view] failed to connect to message bus");
  }

  try {
    await startWebSocketServer();
    console.log("[view] web socket server started");
  } catch (e) {
    console.error(`[view] failed to start web socket server: ${e.message}`);
  }

  try {
    await cache.connect();
    console.log("[view] connected to cache");
  } catch (e) {
    console.error(`[view] failed to connect to cache: ${e.message}`);
  }
};

init();

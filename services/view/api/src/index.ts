import { subscriber } from "./services/subscriber";
import { startWebSocketServer } from "./services/socket";

const init = async () => {
  try {
    await subscriber.connect();
    console.log(`[view] subscriber connected`);
  } catch (e) {
    console.error(`[view] subscriber failed to connect: ${e.message}`);
  }

  try {
    await startWebSocketServer();
    console.log("[view] web socket server started");
  } catch (e) {
    console.error(`[view] failed to start web socket server: ${e.message}`);
  }
};

init();

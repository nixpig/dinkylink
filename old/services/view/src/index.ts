import { subscriber } from "./subscriber";
import { startWSS } from "./server";

const init = async () => {
  try {
    await subscriber.connect();
    console.log(`[view] subscriber connected`);

    await startWSS();
    console.log("[view] websocket server started");
  } catch (error) {
    console.error(`[view] subscriber failed to connect ${error.message}`);
  }
};

init();

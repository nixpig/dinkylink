import { listenToStream } from "./consumer";
import { wss, startWSS } from "./server";

const init = async () => {
  try {
    // await consumer.connect();
    // console.log(`[stats] consumer connected`);

    await startWSS();
    console.log("[stats] websocket server started");

    listenToStream((message, messageId) =>
      wss.broadcast(
        `[stats:wss:stream] ${JSON.stringify(messageId)}: ${JSON.stringify(
          message
        )}`
      )
    );
  } catch (error) {
    console.error(`[stats] subscriber failed to connect ${error.message}`);
  }
};

init();

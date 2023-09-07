import { start } from "./server";
import { connect } from "./services/database";
import { client } from "./services/cache";

const init = async () => {
  await start();
  await connect();
  await client.connect();
  console.log("⚡️ [api] server up and running...");
};

init();

import { start } from "./server";

const init = async () => {
  await start();

  console.log("🔌 [ws] server up and running...");
};

init();

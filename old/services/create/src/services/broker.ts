import { createClient } from "redis";
import { BROKER_CONNECTION_STRING } from "../environment";

export const broker = createClient({
  url: BROKER_CONNECTION_STRING,
});

export const publishLinkCreated = async (link) => {
  console.log(`[broker] publishing link created: ${JSON.stringify(link)}`);
  broker.publish("link_created", JSON.stringify(link));
};

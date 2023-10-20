import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const connectionString = `redis://${process.env.BUS_DOCKER_HOST}:${process.env.BUS_PORT}`;

export const bus = createClient({
  url: connectionString,
});

export const publishLinkVisited = async (link) => {
  try {
    console.log(`[view] publishing link visited message`);
    const published = await bus.publish("link_visited", JSON.stringify(link));
    console.log(`[view] published message: ${JSON.stringify(published)}`);
  } catch (e) {
    console.log(`[view] error publishing message to bus: ${e.message}`);
  }
};

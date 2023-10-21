import { createClient } from "redis";

const connectionString = `redis://${process.env.BUS_DOCKER_HOST}:${process.env.BUS_PORT}`;

export const bus = createClient({
  url: connectionString,
});

export const publishLinkCreated = async (link) => {
  try {
    console.log(`[create] publishing link created message`);
    const published = await bus.publish("link_created", JSON.stringify(link));
    console.log(`[create] published message: ${JSON.stringify(published)}`);
  } catch (e) {
    console.log(`[create] error publishing message to bus: ${e.message}`);
  }
};

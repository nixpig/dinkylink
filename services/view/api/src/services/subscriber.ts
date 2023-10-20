import { createClient } from "redis";

const connectionString = `redis://${process.env.BUS_DOCKER_HOST}:${process.env.BUS_PORT}`;

const client = createClient({ url: connectionString });

export const subscriber = client.duplicate();

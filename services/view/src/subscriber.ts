import { createClient } from "redis";
import { BROKER_CONNECTION_STRING } from "./environment";

const client = createClient({ url: BROKER_CONNECTION_STRING });

export const subscriber = client.duplicate();

import dotenv from "dotenv";

dotenv.config();

export const {
  VIEW_HOST,
  VIEW_PORT,
  BROKER_HOST,
  BROKER_PORT,
  BROKER_USER,
  BROKER_PASSWORD,
} = process.env;

export const BROKER_CONNECTION_STRING = `redis://${BROKER_HOST}:${BROKER_PORT}`;

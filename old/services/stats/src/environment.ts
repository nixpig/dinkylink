import dotenv from "dotenv";

dotenv.config();

export const {
  STATS_HOST,
  STATS_PORT,
  STREAM_HOST,
  STREAM_PORT,
  STREAM_USER,
  STREAM_PASSWORD,
} = process.env;

export const STREAM_CONNECTION_STRING = `redis://${STREAM_HOST}:${STREAM_PORT}`;
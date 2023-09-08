import dotenv from "dotenv";

dotenv.config();

export const {
  API_HOST = "dnkl.ink",
  API_PORT = 8081,
  UI_HOST = "dinkylink.xyz",
  UI_PORT = 8080,
  WS_HOST = "ws.dinkylink.xyz",
  WS_PORT = 8082,
  DB_HOST = "db",
  DB_PORT = 27017,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_INITDB_DATABASE,
  CACHE_HOST = "cache",
  CACHE_PORT = 6379,
  CACHE_USER,
  CACHE_PASSWORD,
  BROKER_HOST = "broker",
  BROKER_PORT = 6379,
  BROKER_USER,
  BROKER_PASSWORD,
} = process.env;

export const DB_CONNECTION_STRING = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${DB_HOST}:${DB_PORT}/${MONGO_INITDB_DATABASE}?authSource=${MONGO_INITDB_DATABASE}`;
export const CACHE_CONNECTION_STRING = `redis://${CACHE_HOST}:${CACHE_PORT}`;
export const BROKER_CONNECTION_STRING = `redis://${BROKER_HOST}:${BROKER_PORT}`;

import dotenv from "dotenv";

dotenv.config();

export const {
  API_HOST = "dnkl.ink",
  API_PORT = 8081,
  UI_HOST = "dinkylink.xyz",
  UI_PORT = 8080,
  DB_HOST = "localhost",
  DB_PORT = 27017,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_INITDB_DATABASE,
  CACHE_HOST = "localhost",
  CACHE_PORT = 6379,
  CACHE_USER,
  CACHE_PASSWORD,
} = process.env;

export const DB_CONNECTION_STRING = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${DB_HOST}:${DB_PORT}/${MONGO_INITDB_DATABASE}?authSource=${MONGO_INITDB_DATABASE}`;

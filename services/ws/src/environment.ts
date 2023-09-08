import dotenv from "dotenv";

dotenv.config();

export const {
  API_HOST = "dnkl.ink",
  API_PORT = 8081,
  UI_HOST = "dinkylink.xyz",
  UI_PORT = 8080,
  WS_HOST = "ws.dinkylink.xyz",
  WS_PORT = 8082,
  DB_HOST = "localhost",
  DB_PORT = 27017,
  CACHE_HOST = "localhost",
  CACHE_PORT = 8083,
  CACHE_USER,
  CACHE_PASSWORD,
} = process.env;

import mongoose from "mongoose";

import { DB_CONNECTION_STRING } from "../environment";

export const connect = async () => {
  try {
    const connection = await mongoose.connect(DB_CONNECTION_STRING);
    return connection;
  } catch (error: any) {
    console.error(`⚠️  [api] failed to connect to database: ${error?.message}`);
    process.exit(1);
  }
};

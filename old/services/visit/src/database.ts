import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "./environment";

export const database = {
  connect: async () => await mongoose.connect(DB_CONNECTION_STRING),
  disconnect: async () => await mongoose.disconnect(),
};

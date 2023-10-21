import mongoose from "mongoose";

const DB_CONNECTION_STRING = `mongodb://${process.env.CREATE_DB_USERNAME}:${process.env.CREATE_DB_PASSWORD}@${process.env.CREATE_DB_DOCKER_HOST}:${process.env.CREATE_DB_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=${process.env.MONGO_INITDB_DATABASE}`;

console.log(`
###
###
###
${DB_CONNECTION_STRING}

###
###
###

`);
export const database = {
  connect: async () => await mongoose.connect(DB_CONNECTION_STRING),
  disconnect: async () => await mongoose.disconnect(),
};

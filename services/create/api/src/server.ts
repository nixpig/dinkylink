import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { createRouter } from "./resources";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/", createRouter);

export const startServer = () => {
  return new Promise<{ port: number }>((res, rej) => {
    app
      .listen(process.env.CREATE_API_PORT, () =>
        res({ port: parseInt(process.env.CREATE_API_PORT) })
      )
      .on("error", rej);
  });
};

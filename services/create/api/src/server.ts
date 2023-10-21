import express from "express";
import cors from "cors";
import morgan from "morgan";

import { createRouter } from "./resources";

const app = express();

app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api", createRouter);

export const startServer = () => {
  return new Promise<{ port: number }>((res, rej) => {
    app
      .listen(process.env.CREATE_API_PORT, () =>
        res({ port: parseInt(process.env.CREATE_API_PORT) })
      )
      .on("error", rej);
  });
};

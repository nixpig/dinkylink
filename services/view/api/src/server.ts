import express from "express";
import cors from "cors";

import { viewRouter } from "./resources/routes";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/", viewRouter);

export const startServer = () => {
  return new Promise<{ port: number }>((res, rej) => {
    app
      .listen(process.env.VIEW_GO_PORT, () =>
        res({ port: parseInt(process.env.VIEW_GO_PORT) })
      )
      .on("error", rej);
  });
};

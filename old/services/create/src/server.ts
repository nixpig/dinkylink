import express from "express";
import cors from "cors";

import { router } from "./resources/create";

import { CREATE_PORT } from "./environment";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/", router);

export const startServer = () =>
  new Promise((resolve, reject) => {
    app
      .listen(CREATE_PORT, () => resolve({ port: CREATE_PORT }))
      .on("error", (error: any) => reject(error?.message));
  });

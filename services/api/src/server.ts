import express from "express";
import cors from "cors";

import { linkRouter } from "./resources/link";

import { API_PORT } from "./environment";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/", linkRouter);

export const server = {
  start: () =>
    new Promise((resolve, reject) => {
      app
        .listen(API_PORT, () => resolve({ port: API_PORT }))
        .on("error", (error: any) => reject(error?.message));
    }),
};

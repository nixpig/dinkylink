import express from "express";
import cors from "cors";

import { linkRouter } from "./resources/link";

import { API_PORT } from "./environment";

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.options("*", cors());

server.use("/", linkRouter);

export const start = () =>
  new Promise((resolve) => {
    server.listen(API_PORT, () => resolve(true));
  });

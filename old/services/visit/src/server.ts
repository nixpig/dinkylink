import express from "express";
import cors from "cors";

import { router } from "./resources/visit.routes";
import { VISIT_PORT } from "./environment";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/", router);

export const startServer = () =>
  new Promise((resolve, reject) => {
    app
      .listen(VISIT_PORT, () => resolve({ port: VISIT_PORT }))
      .on("error", (error: any) => reject(error?.message));
  });

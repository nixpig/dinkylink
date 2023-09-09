import express from "express";

import { createOne } from "./create.controllers";

export const router = express.Router();

router.route("/").post(createOne);

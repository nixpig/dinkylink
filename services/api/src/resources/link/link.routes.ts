import express from "express";

import { shortRedirect, baseRedirect, createOne } from "./link.controllers";

export const linkRouter = express.Router();

linkRouter.route("/").get(baseRedirect).post(createOne);

linkRouter.route("/:shortCode").get(shortRedirect);

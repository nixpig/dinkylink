import express from "express";
import { createOne } from "./controllers";

export const createRouter = express.Router();

createRouter.post("/", createOne);

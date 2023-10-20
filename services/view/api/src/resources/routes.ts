import express from "express";
import { view } from "./controllers";

export const viewRouter = express.Router();

viewRouter.get("/:shortCode", view);

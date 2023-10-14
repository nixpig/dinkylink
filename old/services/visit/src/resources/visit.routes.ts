import express from "express";

import { visit } from "./visit.controllers";

export const router = express.Router();

router.route("/:shortCode").get(visit);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const visit_controllers_1 = require("./visit.controllers");
exports.router = express_1.default.Router();
exports.router.route("/:shortCode").get(visit_controllers_1.visit);
//# sourceMappingURL=visit.routes.js.map
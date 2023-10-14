"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BROKER_CONNECTION_STRING = exports.BROKER_PASSWORD = exports.BROKER_USER = exports.BROKER_PORT = exports.BROKER_HOST = exports.VIEW_PORT = exports.VIEW_HOST = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.VIEW_HOST = _a.VIEW_HOST, exports.VIEW_PORT = _a.VIEW_PORT, exports.BROKER_HOST = _a.BROKER_HOST, exports.BROKER_PORT = _a.BROKER_PORT, exports.BROKER_USER = _a.BROKER_USER, exports.BROKER_PASSWORD = _a.BROKER_PASSWORD;
exports.BROKER_CONNECTION_STRING = `redis://${exports.BROKER_HOST}:${exports.BROKER_PORT}`;
//# sourceMappingURL=environment.js.map
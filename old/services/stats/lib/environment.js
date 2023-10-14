"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.STREAM_CONNECTION_STRING = exports.STREAM_PASSWORD = exports.STREAM_USER = exports.STREAM_PORT = exports.STREAM_HOST = exports.STATS_PORT = exports.STATS_HOST = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.STATS_HOST = _a.STATS_HOST, exports.STATS_PORT = _a.STATS_PORT, exports.STREAM_HOST = _a.STREAM_HOST, exports.STREAM_PORT = _a.STREAM_PORT, exports.STREAM_USER = _a.STREAM_USER, exports.STREAM_PASSWORD = _a.STREAM_PASSWORD;
exports.STREAM_CONNECTION_STRING = `redis://${exports.STREAM_HOST}:${exports.STREAM_PORT}`;
//# sourceMappingURL=environment.js.map
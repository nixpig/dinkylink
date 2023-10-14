"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_CONNECTION_STRING = exports.STREAM_CONNECTION_STRING = exports.DB_CONNECTION_STRING = exports.STREAM_PASSWORD = exports.STREAM_USER = exports.STREAM_PORT = exports.STREAM_HOST = exports.CACHE_PASSWORD = exports.CACHE_USER = exports.CACHE_PORT = exports.CACHE_HOST = exports.MONGO_INITDB_DATABASE = exports.MONGO_PASSWORD = exports.MONGO_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.UI_HOST = exports.VISIT_PORT = exports.VISIT_HOST = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.VISIT_HOST = _a.VISIT_HOST, exports.VISIT_PORT = _a.VISIT_PORT, exports.UI_HOST = _a.UI_HOST, exports.DB_HOST = _a.DB_HOST, exports.DB_PORT = _a.DB_PORT, exports.MONGO_USERNAME = _a.MONGO_USERNAME, exports.MONGO_PASSWORD = _a.MONGO_PASSWORD, exports.MONGO_INITDB_DATABASE = _a.MONGO_INITDB_DATABASE, exports.CACHE_HOST = _a.CACHE_HOST, exports.CACHE_PORT = _a.CACHE_PORT, exports.CACHE_USER = _a.CACHE_USER, exports.CACHE_PASSWORD = _a.CACHE_PASSWORD, exports.STREAM_HOST = _a.STREAM_HOST, exports.STREAM_PORT = _a.STREAM_PORT, exports.STREAM_USER = _a.STREAM_USER, exports.STREAM_PASSWORD = _a.STREAM_PASSWORD;
exports.DB_CONNECTION_STRING = `mongodb://${exports.MONGO_USERNAME}:${exports.MONGO_PASSWORD}@${exports.DB_HOST}:${exports.DB_PORT}/${exports.MONGO_INITDB_DATABASE}?authSource=${exports.MONGO_INITDB_DATABASE}`;
exports.STREAM_CONNECTION_STRING = `redis://${exports.STREAM_HOST}:${exports.STREAM_PORT}`;
exports.CACHE_CONNECTION_STRING = `redis://${exports.CACHE_HOST}:${exports.CACHE_PORT}`;
//# sourceMappingURL=environment.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BROKER_CONNECTION_STRING = exports.CACHE_CONNECTION_STRING = exports.DB_CONNECTION_STRING = exports.BROKER_PASSWORD = exports.BROKER_USER = exports.BROKER_PORT = exports.BROKER_HOST = exports.CACHE_PASSWORD = exports.CACHE_USER = exports.CACHE_PORT = exports.CACHE_HOST = exports.MONGO_INITDB_DATABASE = exports.MONGO_PASSWORD = exports.MONGO_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.CREATE_PORT = exports.CREATE_HOST = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.CREATE_HOST = _a.CREATE_HOST, exports.CREATE_PORT = _a.CREATE_PORT, exports.DB_HOST = _a.DB_HOST, exports.DB_PORT = _a.DB_PORT, exports.MONGO_USERNAME = _a.MONGO_USERNAME, exports.MONGO_PASSWORD = _a.MONGO_PASSWORD, exports.MONGO_INITDB_DATABASE = _a.MONGO_INITDB_DATABASE, exports.CACHE_HOST = _a.CACHE_HOST, exports.CACHE_PORT = _a.CACHE_PORT, exports.CACHE_USER = _a.CACHE_USER, exports.CACHE_PASSWORD = _a.CACHE_PASSWORD, exports.BROKER_HOST = _a.BROKER_HOST, exports.BROKER_PORT = _a.BROKER_PORT, exports.BROKER_USER = _a.BROKER_USER, exports.BROKER_PASSWORD = _a.BROKER_PASSWORD;
exports.DB_CONNECTION_STRING = `mongodb://${exports.MONGO_USERNAME}:${exports.MONGO_PASSWORD}@${exports.DB_HOST}:${exports.DB_PORT}/${exports.MONGO_INITDB_DATABASE}?authSource=${exports.MONGO_INITDB_DATABASE}`;
exports.CACHE_CONNECTION_STRING = `redis://${exports.CACHE_HOST}:${exports.CACHE_PORT}`;
exports.BROKER_CONNECTION_STRING = `redis://${exports.BROKER_HOST}:${exports.BROKER_PORT}`;
//# sourceMappingURL=environment.js.map
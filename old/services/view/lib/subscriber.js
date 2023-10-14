"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriber = void 0;
const redis_1 = require("redis");
const environment_1 = require("./environment");
const client = (0, redis_1.createClient)({ url: environment_1.BROKER_CONNECTION_STRING });
exports.subscriber = client.duplicate();
//# sourceMappingURL=subscriber.js.map
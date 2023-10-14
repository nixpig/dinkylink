"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const redis_1 = require("redis");
const environment_1 = require("./environment");
exports.cache = (0, redis_1.createClient)({
    url: environment_1.CACHE_CONNECTION_STRING,
});
//# sourceMappingURL=cache.js.map
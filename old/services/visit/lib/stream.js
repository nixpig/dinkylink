"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVisitToStream = exports.stream = void 0;
const redis_1 = require("redis");
const environment_1 = require("./environment");
const STREAM_KEY = "link_stats";
exports.stream = (0, redis_1.createClient)({
    url: environment_1.STREAM_CONNECTION_STRING,
});
const addVisitToStream = (visit) => __awaiter(void 0, void 0, void 0, function* () {
    const id = "*";
    console.log(`[visit] Adding visit to stream: ${JSON.stringify(visit)}`);
    yield exports.stream.xAdd(STREAM_KEY, id, { shortCode: visit.shortCode });
    console.log(`[visit] Added visit to stream: ${JSON.stringify(visit)}`);
});
exports.addVisitToStream = addVisitToStream;
//# sourceMappingURL=stream.js.map
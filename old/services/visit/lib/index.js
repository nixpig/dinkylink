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
const server_1 = require("./server");
const database_1 = require("./database");
const cache_1 = require("./cache");
const stream_1 = require("./stream");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.startServer)();
        console.log("[visit] server started successfully");
        yield database_1.database.connect();
        console.log("[visit] database connected successfully");
        yield cache_1.cache.connect();
        console.log("[visit] cache connected successfully");
        yield stream_1.stream.connect();
        console.log("[visit] stream connected successfully");
    }
    catch (error) {
        console.error(`[visit] failed to start: ${error.message}`);
        process.exit(1);
    }
});
init();
//# sourceMappingURL=index.js.map
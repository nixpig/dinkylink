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
const database_1 = require("./services/database");
const cache_1 = require("./services/cache");
const broker_1 = require("./services/broker");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.startServer)();
        console.log(`[create] server running`);
        yield database_1.database.connect();
        console.log(`[create] connected to database`);
        yield cache_1.cache.connect();
        console.log(`[create] connected to cache`);
        yield broker_1.broker.connect();
        console.log(`[create] connected to broker`);
    }
    catch (error) {
        console.error(`[create] server error ${error === null || error === void 0 ? void 0 : error.message}`);
        process.exit(1);
    }
});
init();
//# sourceMappingURL=index.js.map
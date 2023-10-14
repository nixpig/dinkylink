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
exports.startWSS = exports.wss = void 0;
const ws_1 = require("ws");
const environment_1 = require("./environment");
exports.wss = new ws_1.Server({ port: environment_1.STATS_PORT });
const startWSS = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.wss.on("connection", (ws) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("[consumer] a client connected");
        ws.on("close", () => {
            console.log("[consumer] a client disconnected");
        });
        ws.on("error", () => {
            console.error("[consumer] an error occurred with a client");
        });
    }));
    exports.wss.broadcast = (message) => {
        console.log(`[consumer] broadcasting data: ${message}`);
        for (let client of exports.wss.clients) {
            client.send(message);
        }
    };
});
exports.startWSS = startWSS;
//# sourceMappingURL=server.js.map
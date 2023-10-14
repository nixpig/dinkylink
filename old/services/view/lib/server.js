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
exports.startWSS = void 0;
const ws_1 = require("ws");
const subscriber_1 = require("./subscriber");
const environment_1 = require("./environment");
const startWSS = () => __awaiter(void 0, void 0, void 0, function* () {
    const wss = new ws_1.Server({ port: environment_1.VIEW_PORT });
    wss.on("connection", (ws) => {
        console.log("[view] a client connected");
        subscriber_1.subscriber.subscribe("link_created", (message) => {
            wss.broadcast(message);
        });
        ws.on("close", () => {
            subscriber_1.subscriber.unsubscribe();
            console.log("[view] a client disconnected");
        });
        ws.on("error", () => {
            console.error("[view] an error occurred with a client");
        });
    });
    wss.broadcast = (message) => {
        console.log(`[view] broadcasting data: ${message}`);
        for (let client of wss.clients) {
            console.log(`[view] broadcasting to client: ${JSON.stringify(client)}`);
            client.send(message);
        }
    };
});
exports.startWSS = startWSS;
//# sourceMappingURL=server.js.map
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
const subscriber_1 = require("./subscriber");
const server_1 = require("./server");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield subscriber_1.subscriber.connect();
        console.log(`[view] subscriber connected`);
        yield (0, server_1.startWSS)();
        console.log("[view] websocket server started");
    }
    catch (error) {
        console.error(`[view] subscriber failed to connect ${error.message}`);
    }
});
init();
//# sourceMappingURL=index.js.map
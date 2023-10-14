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
const consumer_1 = require("./consumer");
const server_1 = require("./server");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.startWSS)();
        console.log("[stats] websocket server started");
        const streamConsumerName = "stats_consumer";
        const linkStatsStreamKey = "link_stats";
        const linkVisitsGroupName = "link_visits_group";
        (0, consumer_1.listenToStream)(linkStatsStreamKey, linkVisitsGroupName, streamConsumerName, (messageData, messageId) => server_1.wss.broadcast(JSON.stringify({
            streamKey: linkStatsStreamKey,
            groupName: linkVisitsGroupName,
            consumerName: streamConsumerName,
            message: {
                messageData,
                messageId,
            },
        })));
    }
    catch (error) {
        console.error(`[stats] subscriber failed to connect ${error.message}`);
    }
});
init();
//# sourceMappingURL=index.js.map
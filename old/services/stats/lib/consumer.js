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
exports.listenToStream = void 0;
const redis_1 = require("redis");
const environment_1 = require("./environment");
const READ_MAX_COUNT = 100;
const ID_POSITION = "0";
const listenToStream = (streamKey, groupName, consumerName, onMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const client = (0, redis_1.createClient)({ url: environment_1.STREAM_CONNECTION_STRING });
    const consumer = client;
    console.log(`[stats] trying to listen to stream: ${streamKey}`);
    yield client.connect();
    const consumerExists = yield consumer.exists(streamKey);
    if (!consumerExists) {
        yield client.xGroupCreate(streamKey, groupName, ID_POSITION, {
            MKSTREAM: true,
        });
    }
    while (true) {
        console.log(`[stats] waiting for data in stream: ${streamKey}`);
        const streamLength = yield consumer.xLen(streamKey);
        console.log(`📐 [stats] stream length: ${JSON.stringify(streamLength)}`);
        const dataRead = yield consumer.xReadGroup((0, redis_1.commandOptions)({ isolated: true }), groupName, consumerName, [{ key: streamKey, id: ">" }], {
            COUNT: READ_MAX_COUNT,
            BLOCK: 0,
        });
        for (let data of dataRead) {
            console.log(`[stats] data in stream: ${streamKey}`);
            for (let item of data.messages) {
                console.log(`[stats] processing item: ${JSON.stringify(item)}`);
                yield onMessage(item.message, item.id);
                console.log(`[stats] acking item: ${JSON.stringify(item)}`);
                consumer.xAck(streamKey, groupName, item.id);
            }
        }
    }
});
exports.listenToStream = listenToStream;
//# sourceMappingURL=consumer.js.map
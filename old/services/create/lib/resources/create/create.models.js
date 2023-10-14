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
exports.Create = exports.createSchema = void 0;
const mongoose_1 = require("mongoose");
const broker_1 = require("../../services/broker");
const cache_1 = require("../../services/cache");
exports.createSchema = new mongoose_1.Schema({
    targetUrl: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });
exports.createSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        cache_1.cache.set(doc.shortCode, doc.targetUrl);
        (0, broker_1.publishLinkCreated)(doc);
    });
});
exports.Create = (0, mongoose_1.model)("Create", exports.createSchema);
//# sourceMappingURL=create.models.js.map
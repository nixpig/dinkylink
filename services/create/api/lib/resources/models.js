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
exports.CreateModel = exports.createSchema = void 0;
const mongoose_1 = require("mongoose");
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
exports.createSchema.post("save", (res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.CreateModel = (0, mongoose_1.model)("Create", exports.createSchema, "links");
//# sourceMappingURL=models.js.map
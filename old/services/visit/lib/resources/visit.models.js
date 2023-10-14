"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visit = exports.visitSchema = void 0;
const mongoose_1 = require("mongoose");
exports.visitSchema = new mongoose_1.Schema({
    targetUrl: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });
exports.Visit = (0, mongoose_1.model)("Visit", exports.visitSchema);
//# sourceMappingURL=visit.models.js.map
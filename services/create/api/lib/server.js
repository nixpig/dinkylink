"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const resources_1 = require("./resources");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
app.use("/api", resources_1.createRouter);
const startServer = () => {
    return new Promise((res, rej) => {
        app
            .listen(process.env.CREATE_API_PORT, () => res({ port: parseInt(process.env.CREATE_API_PORT) }))
            .on("error", rej);
    });
};
exports.startServer = startServer;
//# sourceMappingURL=server.js.map
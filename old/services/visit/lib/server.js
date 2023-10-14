"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const visit_routes_1 = require("./resources/visit.routes");
const environment_1 = require("./environment");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
app.use("/", visit_routes_1.router);
const startServer = () => new Promise((resolve, reject) => {
    app
        .listen(environment_1.VISIT_PORT, () => resolve({ port: environment_1.VISIT_PORT }))
        .on("error", (error) => reject(error === null || error === void 0 ? void 0 : error.message));
});
exports.startServer = startServer;
//# sourceMappingURL=server.js.map
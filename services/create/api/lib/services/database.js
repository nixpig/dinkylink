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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const DB_CONNECTION_STRING = `mongodb://${process.env.CREATE_DB_USERNAME}:${process.env.CREATE_DB_PASSWORD}@${process.env.CREATE_DB_DOCKER_HOST}:${process.env.CREATE_DB_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=${process.env.MONGO_INITDB_DATABASE}`;
console.log(`
###
###
###
${DB_CONNECTION_STRING}

###
###
###

`);
exports.database = {
    connect: () => __awaiter(void 0, void 0, void 0, function* () { return yield mongoose_1.default.connect(DB_CONNECTION_STRING); }),
    disconnect: () => __awaiter(void 0, void 0, void 0, function* () { return yield mongoose_1.default.disconnect(); }),
};
//# sourceMappingURL=database.js.map
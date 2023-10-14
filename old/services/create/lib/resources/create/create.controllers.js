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
exports.createOne = void 0;
const crypto_1 = __importDefault(require("crypto"));
const create_models_1 = require("./create.models");
const createOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let targetUrl;
    try {
        targetUrl = new URL((_a = req.body) === null || _a === void 0 ? void 0 : _a.targetUrl);
    }
    catch (error) {
        console.error(`[create] failed to parse provided URL: ${JSON.stringify(targetUrl, null, 2)}`);
        return res.status(500).send({
            message: `${error.input} does not appear to be a valid URL. Please check and try again.`,
        });
    }
    const generateUniqueShortCode = () => __awaiter(void 0, void 0, void 0, function* () {
        const shortCode = crypto_1.default.randomBytes(3).toString("hex").slice(0, 5);
        const duplicates = yield create_models_1.Create.find({ shortCode: shortCode }).exec();
        if (duplicates.length > 0) {
            yield generateUniqueShortCode();
        }
        else {
            return shortCode;
        }
    });
    const shortCode = yield generateUniqueShortCode();
    try {
        const link = yield create_models_1.Create.create({
            targetUrl: targetUrl.href,
            shortCode: shortCode,
            active: true,
        });
        return res.status(201).send(link);
    }
    catch (error) {
        return res.status(500).send({ message: `${error === null || error === void 0 ? void 0 : error.message}` });
    }
});
exports.createOne = createOne;
//# sourceMappingURL=create.controllers.js.map
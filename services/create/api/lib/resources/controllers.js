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
exports.createOne = void 0;
const utils_1 = require("../utils");
const models_1 = require("./models");
const createOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let targetUrl;
    let shortCode;
    try {
        targetUrl = new URL((_a = req.body) === null || _a === void 0 ? void 0 : _a.targetUrl);
    }
    catch (e) {
        console.error(`[create] failed to parse provided URL: ${JSON.stringify(targetUrl)}`);
        return res.status(500).send({
            message: `${e.input} does not appear to be a valid URL.`,
        });
    }
    let duplicates;
    do {
        shortCode = yield (0, utils_1.generateUniqueShortCode)();
        duplicates = yield models_1.CreateModel.find({ shortCode }).exec();
    } while (duplicates.length > 0);
    try {
        const link = yield models_1.CreateModel.create({
            targetUrl: targetUrl.href,
            active: true,
            shortCode,
        });
        return res.status(201).send(link);
    }
    catch (e) {
        return res.status(500).send(e);
    }
});
exports.createOne = createOne;
//# sourceMappingURL=controllers.js.map
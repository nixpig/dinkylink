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
exports.visit = void 0;
const visit_models_1 = require("./visit.models");
const cache_1 = require("../cache");
const stream_1 = require("../stream");
const visit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortCode = req.params.shortCode;
        let targetUrl;
        const cachedResult = yield cache_1.cache.get(shortCode);
        if (cachedResult) {
            targetUrl = cachedResult;
        }
        else {
            const queriedResult = yield visit_models_1.Visit.findOne({ shortCode }, { targetUrl: 1 }).exec();
            targetUrl = queriedResult === null || queriedResult === void 0 ? void 0 : queriedResult.targetUrl;
        }
        if (targetUrl) {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const cached = yield cache_1.cache.exists(shortCode);
                if (cached !== 1) {
                    cache_1.cache.set(shortCode, targetUrl);
                }
            }));
            res.set("location", targetUrl);
            (0, stream_1.addVisitToStream)({ shortCode });
            return res.status(302).send();
        }
        else {
            return res.set(404).send({ message: "Not Found" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.visit = visit;
//# sourceMappingURL=visit.controllers.js.map
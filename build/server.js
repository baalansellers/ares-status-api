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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
const corsOptions = {
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.get("/skywarn-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield axios_1.default.get("https://srcares.dreamhosters.com/activation/");
    const $ = yield cheerio_1.default.load(resp.data);
    const imageURL = $("figure.skywarn-status img").attr("src");
    //console.log(imageURL);
    res.status(200).send({ imageURI: imageURL });
}));
app.get("/ares-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield axios_1.default.get("https://srcares.dreamhosters.com/activation/");
    const $ = yield cheerio_1.default.load(resp.data);
    const imageURL = $("figure.ares-status img").attr("src");
    //console.log(imageURL);
    res.status(200).send({ imageURI: imageURL });
}));
app.listen(PORT, () => {
    console.log(`Server started on port:${PORT}. Press Ctrl+C to quit.`);
});
//# sourceMappingURL=server.js.map
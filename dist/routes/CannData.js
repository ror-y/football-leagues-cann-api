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
exports.getLeagueData = void 0;
const competitionIds_1 = __importDefault(require("../config/competitionIds"));
const api_1 = __importDefault(require("../config/api"));
const axios_1 = __importDefault(require("../config/axios"));
const getResults_1 = require("../helpers/getResults");
function getLeagueData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const leagueId = competitionIds_1.default[req.url.replace("/", "")];
        if (!leagueId) {
            throw new Error("Invalid league");
        }
        try {
            const data = yield axios_1.default.request({
                method: "get",
                url: leagueId,
                headers: {
                    "X-RapidAPI-Host": api_1.default.headers.apiHost,
                    "X-RapidAPI-Key": api_1.default.headers.key,
                },
            });
            const standings = data.data.api.standings[0];
            const results = (0, getResults_1.getResults)(standings);
            res.json(results);
        }
        catch (err) {
            return res.status(500).json({
                error: `Something went wrong. ERROR: ${err}`,
            });
        }
    });
}
exports.getLeagueData = getLeagueData;

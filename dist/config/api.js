"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api = {
    urlBase: "https://api-football-v1.p.rapidapi.com/v2/leagueTable",
    headers: {
        apiHost: process.env.API_HOST,
        key: process.env.KEY,
    },
};
exports.default = api;

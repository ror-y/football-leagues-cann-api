"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = require("express");
const cannRouter = (0, express_1.Router)();
const CannData_1 = require("./CannData");
cannRouter.get([`/bundesliga`, `/premier-league`, `/la-liga`, `/serie-a`, `/ligue-1`], CannData_1.getLeagueData);
// Export the base-router
const baseRouter = (0, express_1.Router)();
baseRouter.use("/cann-data", cannRouter);
exports.default = baseRouter;

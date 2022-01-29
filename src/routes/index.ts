import "dotenv/config";
import { Router } from "express";
const cannRouter = Router();
import { getLeagueData } from "./CannData";

cannRouter.get(
  [`/bundesliga`, `/premier-league`, `/la-liga`, `/serie-a`, `/ligue-1`],
  getLeagueData
);

// Export the base-router
const baseRouter = Router();
baseRouter.use("/cann-data", cannRouter);
export default baseRouter;

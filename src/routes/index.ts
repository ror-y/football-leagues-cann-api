import "dotenv/config";
import { Router } from "express";
const cannRouter = Router();
import { getLeagueData } from "./CannData";
import leagues from '../config/leagues'

cannRouter.get(
  leagues,
  getLeagueData
);

// Export the base-router
const baseRouter = Router();
baseRouter.use("/cann-data", cannRouter);
export default baseRouter;

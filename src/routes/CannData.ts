import { Request, Response } from "express";
import competitionIds from "../config/competitionIds";
import apiConfig from "../config/api";
import cacheConfig from "../config/cache";
import { TTeam } from "src/@types/cann-data";
import axios from "../config/axios";
import { getResults } from "../helpers/getResults";
import NodeCache from "node-cache";
const cache = new NodeCache();
import leagues from '../config/leagues'

export async function getLeagueData(req: Request, res: Response) {
  const leagueId = competitionIds[req.url.replace("/", "")];

  if (!leagueId) {
    throw new Error("Invalid league");
  }

  const cachedData = cache.get(req.url);

  console.log("CD:", cachedData);

  if (cachedData) {
    res.json(cachedData);
    return;
  }

  try {
    const data = await axios.request({
      method: "get",
      url: leagueId,
      headers: {
        "X-RapidAPI-Host": apiConfig.headers.apiHost,
        "X-RapidAPI-Key": apiConfig.headers.key,
      },
    });

    const standings: Array<TTeam> = data.data.api.standings[0];
    const results = getResults(standings);

    cache.set(leagues.find(l => l === req.url) as string, results, cacheConfig.timeoutInSeconds);

    res.json(results);
  } catch (err) {
    return res.status(500).json({
      error: `Something went wrong. ERROR: ${err as string}`,
    });
  }
}

import { Request, Response } from "express";
import competitionIds from "../config/competitionIds";
import apiConfig from "../config/api";
import { TTeam } from "src/@types/cann-data";
import axios from "../config/axios";
import { getResults } from "../helpers/getResults";

export async function getLeagueData(req: Request, res: Response) {
  const leagueId = competitionIds[req.url.replace("/", "")];

  if (!leagueId) {
    throw new Error("Invalid league");
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

    res.json(results);
  } catch (err) {
    return res.status(500).json({
      error: `Something went wrong. ERROR: ${err}`,
    });
  }
}

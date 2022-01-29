import axios from "axios";
import { Request, Response } from "express";
import competitionIds from "../config/competitionIds";
import apiConfig from "../config/api";
import mockDataIn from "src/config/mockDataIn";
import { getResults } from "../helpers/getResults";

export async function getLeagueData(req: Request, res: Response) {
  const leagueId = competitionIds[req.url.replace("/", "")];

  if (!leagueId) {
    throw new Error("Invalid league");
  }

  const requestUrl = `${apiConfig.urlBase}/${leagueId}`;

  try {
    // const data = await axios.get(requestUrl, {
    //   headers: {
    //     "X-RapidAPI-Host": apiConfig.headers.apiHost,
    //     "X-RapidAPI-Key": apiConfig.headers.key,
    //   },
    // });
    // const standings: Array<TTeam> = data.data.api.standings[0];

    const standings = mockDataIn;

    const results = getResults(standings);
    // const resultsWithNulls = withNulls(results);

    res.json(results);
  } catch (err) {
    return res.status(500).json({
      error: `Something went wrong. ERROR: ${err}`,
    });
  }
}

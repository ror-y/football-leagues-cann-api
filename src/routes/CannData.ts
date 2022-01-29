import axios from "axios";
import { Request, Response } from "express";
import { TParsedTeam, TTeam } from "src/@types/cann-data";
import times from "lodash.times";
import competitionIds from "../config/competitionIds";
import apiConfig from "../config/api";

const parse = (team: TTeam) => {
  return {
    name: team.name,
    rank: Number(team.rank),
    points: Number(team.points),
  };
};

const getResults = (tableData: Array<TTeam>) => {
  return tableData.reduce((acc, t, i, arr) => {
    const previousTeam = arr[i - 1];

    if (previousTeam && Number(previousTeam.points) === Number(t.points)) {
      acc[acc.length - 1].push(parse(t));
    } else {
      acc.push([parse(t)]);
    }

    return acc;
  }, [] as Array<TParsedTeam>);
};

const withNulls = (teams: Array<TParsedTeam>) => {
  return teams.reduce((acc, cur, curIdx, arr) => {
    console.log("cur:", cur);
    acc.push(cur);
    const nextTeam = arr[curIdx + 1];
    if (nextTeam) {
      times(Number(cur[0].points) - Number(nextTeam[0].points) - 1, () =>
        acc.push(null)
      );
    }
    return acc;
  }, [] as Array<TParsedTeam | null>);
};

const getIdFromUrl = (url: string) => {
  return competitionIds[url];
};

export async function getLeagueData(req: Request, res: Response) {
  const leagueId = getIdFromUrl(req.url.replace("/", ""));

  if (!leagueId) {
    throw new Error("Invalid league");
  }

  console.log(req.url);
  const requestUrl = `${apiConfig.urlBase}/${leagueId}`;

  try {
    const data = await axios.get(requestUrl, {
      headers: {
        "X-RapidAPI-Host": apiConfig.headers.host,
        "X-RapidAPI-Key": apiConfig.headers.key,
      },
    });
    const tableData: Array<TTeam> = data.data.data.table;

    const results = getResults(tableData);
    const resultsWithNulls = withNulls(results);

    res.json(resultsWithNulls);
  } catch (err) {
    return res.status(500).json({
      error: `Something went wrong. ERROR: ${err}`,
    });
  }
}

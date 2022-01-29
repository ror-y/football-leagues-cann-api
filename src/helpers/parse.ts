import { TTeam } from "src/@types/cann-data";

export const parse = (team: TTeam) => {
  return {
    name: team.teamName,
    logo: team.logo,
    points: team.points,
    rank: team.rank,
  };
};

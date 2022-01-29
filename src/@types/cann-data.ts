export type TTeam = {
  competition_id: string;
  drawn: string;
  goal_diff: string;
  goals_conceded: string;
  goals_scored: string;
  group_id: string;
  group_name: string;
  league_id: string;
  lost: string;
  matches: string;
  name: string;
  points: string;
  rank: string;
  season_id: string;
  team_id: string;
  won: string;
};

export type TParsedTeam = Array<{
  name: string;
  rank: number;
  points: number;
}>;

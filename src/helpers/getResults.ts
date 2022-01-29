import { TTeam } from "src/@types/cann-data";
import { parse } from "../helpers/parse";

export const getResults = (standings: Array<TTeam>) => {
  let result = [];
  const upperBound = standings[0].points;
  const lowerBound = standings[standings.length - 1].points;
  for (let i = upperBound; i >= lowerBound; i--) {
    const foundItems = standings.filter((s) => s.points === i);
    if (foundItems.length) {
      result.push(foundItems.map((f) => parse(f)));
    } else {
      result.push([
        {
          points: i,
        },
      ]);
    }
  }
  return result;
};

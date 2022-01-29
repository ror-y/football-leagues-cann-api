const api = {
  urlBase: "https://api-football-v1.p.rapidapi.com/v2/leagueTable",
  headers: {
    apiHost: process.env.API_HOST as string,
    key: process.env.KEY as string,
  },
};

export default api;

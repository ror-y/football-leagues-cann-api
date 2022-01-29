const api = {
  urlBase: "https://api-football-v1.p.rapidapi.com/v2/leagueTable",
  headers: {
    host: process.env.HOST,
    key: process.env.KEY,
  },
};

export default api;

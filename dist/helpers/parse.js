"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parse = (team) => {
    return {
        name: team.teamName,
        logo: team.logo,
        points: team.points,
        rank: team.rank,
    };
};
exports.parse = parse;

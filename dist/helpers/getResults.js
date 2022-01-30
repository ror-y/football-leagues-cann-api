"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResults = void 0;
const parse_1 = require("../helpers/parse");
const getResults = (standings) => {
    let result = [];
    const upperBound = standings[0].points;
    const lowerBound = standings[standings.length - 1].points;
    for (let i = upperBound; i >= lowerBound; i--) {
        const foundItems = standings.filter((s) => s.points === i);
        if (foundItems.length) {
            result.push(foundItems.map((f) => (0, parse_1.parse)(f)));
        }
        else {
            result.push([
                {
                    points: i,
                },
            ]);
        }
    }
    return result;
};
exports.getResults = getResults;

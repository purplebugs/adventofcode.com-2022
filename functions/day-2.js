import { readFileSync } from "fs";

export const day_2 = () => {
  const day_2 = "day-2.txt"; //  https://adventofcode.com/2022/day/2

  // Read file from disk
  const data = readFileSync(`./data/${day_2}`, "utf8");

  const calculateScore = (opponent, me) => {
    return 1; // TODO
  };

  const arrayOfRounds = data.split("\n").map((round) => {
    const roundAsString = round.replace(" ", "").split(","); // eg ["BZ"]
    // TODO transform to RPC
    return roundAsString; // eg ["AY"],["BY"]
  });

  const arrayOfScores = arrayOfRounds.map((round) => {
    return calculateScore(round[0], round[1]);
  });

  console.log("DAY TWO - TODO\n");
  console.log(`arrayOfRounds: ${JSON.stringify(arrayOfRounds)}`);
  // console.log(`arrayOfScores: ${JSON.stringify(arrayOfScores)}`);
};

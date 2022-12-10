import { readFileSync } from "fs";

export const day_2 = () => {
  const day_2 = "day-2.txt"; //  https://adventofcode.com/2022/day/2

  // Read file from disk
  const data = readFileSync(`./data/${day_2}`, "utf8");

  const arrayOfRounds = data.split("\n").map((round) => {
    const regex1 = /[AX]/g;
    const regex2 = /[BY]/g;
    const regex3 = /[CZ]/g;

    const roundAsPaperScissorRock = round
      .replace(" ", "") // -> "BZ"
      .replace(regex1, "R") // -> R for Rock
      .replace(regex2, "P") // -> P for Paper
      .replace(regex3, "S") // -> S for Scissors
      .split(","); // -> ["PS"];

    return roundAsPaperScissorRock; // eg ["AY"],["BY"]
  });

  const calculateScore = (opponent, me) => {
    console.log("opponent:", opponent.toString());
    console.log("me:", me.toString());
    const scoreForShapeSelected = () => {
      if (me === "R") {
        return 1;
      }
      if (me === "P") {
        return 2;
      }
      if (me === "S") {
        return 3;
      }
    };
    const scoreWinLoseDraw = () => {
      if (
        (opponent == "P" && me == "S") ||
        (opponent == "R" && me == "P") ||
        (opponent == "S" && me == "R")
      ) {
        // win
        return 6;
      }
      if (
        (me == "P" && opponent == "S") ||
        (me == "R" && opponent == "P") ||
        (me == "S" && opponent == "R")
      ) {
        // lose
        return 0;
      }
      if (opponent == me) {
        // draw
        return 3;
      }
    };

    return scoreForShapeSelected() + scoreWinLoseDraw();
  };

  const arrayOfScores = arrayOfRounds.map((round) => {
    const opponent = round[0].slice(0, 1); // ["PR"] -> "P"
    const me = round[0].slice(1, 2); // ["PR"] -> "R"
    return calculateScore(opponent, me);
  });

  console.log("DAY TWO - TODO\n");
  //console.log(`arrayOfRounds: ${JSON.stringify(arrayOfRounds)}`);
  console.log(`arrayOfScores: ${JSON.stringify(arrayOfScores)}`);
};

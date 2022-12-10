import { readFileSync } from "fs";

export const day_2 = () => {
  const day_2 = "day-2.txt"; //  https://adventofcode.com/2022/day/2

  // Read file from disk
  const data = readFileSync(`./data/${day_2}`, "utf8");

  const arrayOfRounds = data.split("\n").map((round) => {
    const roundAsPaperScissorRock = round
      .replace(" ", "") // -> "BZ"
      .replace(/[AX]/g, "R") // -> R for Rock
      .replace(/[BY]/g, "P") // -> P for Paper
      .replace(/[CZ]/g, "S") // -> S for Scissors
      .split(","); // -> ["PS"];

    return roundAsPaperScissorRock; // eg ["PS"],["RP"]
  });

  const calculateScore = (opponent, me) => {
    const scoreForShapeSelected = () => {
      if (me === "R") return 1;
      if (me === "P") return 2;
      if (me === "S") return 3;
    };
    const scoreWinLoseDraw = () => {
      if (
        (opponent == "P" && me == "S") ||
        (opponent == "R" && me == "P") ||
        (opponent == "S" && me == "R")
      ) {
        return 6; // win
      }
      if (
        (me == "P" && opponent == "S") ||
        (me == "R" && opponent == "P") ||
        (me == "S" && opponent == "R")
      ) {
        return 0; // lose
      }
      if (opponent == me) {
        return 3; // draw
      }
    };

    return scoreForShapeSelected() + scoreWinLoseDraw();
  };

  const arrayOfScores = arrayOfRounds.map((round) => {
    return calculateScore(round[0][0], round[0][1]); // ["PR"] -> calculateScore("P", "R")
  });

  const sumOfScores = arrayOfScores.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  console.log("DAY TWO  - Part One\n");
  console.log(`Sum of scores: ${JSON.stringify(sumOfScores)}\n`);

  console.log("DAY TWO  - Part Two\n");
  console.log(`TO DO \n`);
};

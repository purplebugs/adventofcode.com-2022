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

    return roundAsPaperScissorRock;
  });

  const scoreForShapeSelected = (shape) => {
    if (shape === "R") return 1;
    if (shape === "P") return 2;
    if (shape === "S") return 3;
  };

  const scoreWinLoseDraw_part_1 = (opponent, me) => {
    // "me": what I played
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

  const scoreWinLoseDraw_2 = (opponent, me) => {
    // "me": what to play to draw: 3, win: 6, or lose: 0
    if (opponent == "P" && me == "P") return scoreForShapeSelected("P") + 3; // me = "Y" = draw
    if (opponent == "R" && me == "R") return scoreForShapeSelected("S") + 0; // me = "X" = lose
    if (opponent == "S" && me == "S") return scoreForShapeSelected("R") + 6; // me = "S" = win

    if (opponent == "P" && me == "R") return scoreForShapeSelected("R") + 0; // me = "X" = lose
    if (opponent == "R" && me == "S") return scoreForShapeSelected("P") + 6; // me = "S" = win
    if (opponent == "S" && me == "P") return scoreForShapeSelected("S") + 3; // me = "Y" = draw

    if (opponent == "P" && me == "S") return scoreForShapeSelected("S") + 6; // me = "S" = win
    if (opponent == "R" && me == "P") return scoreForShapeSelected("R") + 3; // me = "Y" = draw
    if (opponent == "S" && me == "R") return scoreForShapeSelected("P") + 0; // me = "X" = lose
  };

  const arrayOfScores_part_1 = arrayOfRounds.map((round) => {
    const scoreShape = scoreForShapeSelected(round[0][1]); // ["PR"] -> scoreForShapeSelected("R")
    const scoreGame_1 = scoreWinLoseDraw_part_1(round[0][0], round[0][1]); // ["PR"] -> scoreWinLoseDraw_part_1("P","R")
    return scoreShape + scoreGame_1;
  });

  const arrayOfScores_part_2 = arrayOfRounds.map((round) => {
    return scoreWinLoseDraw_2(round[0][0], round[0][1]); // ["PR"] -> scoreWinLoseDraw_2("P","R")
  });

  console.log("DAY TWO  - Part One\n");
  console.log(
    `Sum of scores: ${JSON.stringify(
      arrayOfScores_part_1.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      )
    )}\n`
  );

  console.log("DAY TWO  - Part Two\n");
  console.log(
    `Sum of scores: ${JSON.stringify(
      arrayOfScores_part_2.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      )
    )}\n`
  );
};

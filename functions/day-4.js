import { readFileSync } from "fs";

export const day_4 = () => {
  const day_4 = "day-4.txt"; //  https://adventofcode.com/2022/day/4

  // Read file from disk
  const data = readFileSync(`./data/${day_4}`, "utf8");

  // 6-63,80-92 -> {"A":6,"B":87},{"A":6,"B":92}
  const pairs = data.split("\n").map((line) => {
    const pair = {
      A: +line.split(",")[0].split("-")[0], // 6-63 -> {"A":6,"B":87}
      B: +line.split(",")[1].split("-")[1], // 80-92 -> {"A":6,"B":92}
    };
    return pair;
  });

  console.log("DAY FOUR  - Part One");

  // console.log(`TODO ${JSON.stringify(pairs)}\n`);

  console.log("DAY FOUR  - Part Two");
  console.log(`TODO \n\n`);
};

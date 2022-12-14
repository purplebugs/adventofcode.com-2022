import { readFileSync } from "fs";

export const day_6 = () => {
  const day_6 = "day-6.txt"; //  https://adventofcode.com/2022/day/6

  // Read file from disk
  const data = readFileSync(`./data/${day_6}`, "utf8");
  const signals = data.split("");

  console.log("DAY SIX - Part One");
  //console.log(` TODO ${JSON.stringify(signals)}\n`);
  console.log("DAY SIX - Part Two");
  console.log(`TODO \n\n`);
};

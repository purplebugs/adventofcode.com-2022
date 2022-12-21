import { readFileSync } from "fs";

export const day_8 = () => {
  const day_8 = "day-8-example.txt"; //  https://adventofcode.com/2022/day/8

  const data = readFileSync(`./data/${day_8}`, "utf8");

  console.log("DAY EIGHT\n");
  console.log(`1: TODO ${data}`);
  console.log(`2: TODO \n\n`);
};

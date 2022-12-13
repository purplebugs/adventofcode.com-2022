import { readFileSync } from "fs";

export const day_4 = () => {
  const day_4 = "day-4.txt"; //  https://adventofcode.com/2022/day/4

  // Read file from disk
  const data = readFileSync(`./data/${day_4}`, "utf8");

  const pairs = data.split("\n").map((line) => {
    // 6-63,80-92 -> "A":[6,63],"B":[80,92]
    const A = line
      .split(",")[0]
      .split("-")
      .map((str) => +str); // 6-63 -> "A":[6,63]
    const B = line
      .split(",")[1]
      .split("-")
      .map((str) => +str); // 80-92 -> "B":[80,92]}
    let isMatch = 0;
    if (A[0] >= B[0] && A[1] <= B[1]) {
      isMatch = 1;
    }
    if (B[0] >= A[0] && B[1] <= A[1]) {
      isMatch = 1;
    }
    const pair = {
      A: A,
      B: B,
      isMatch: isMatch,
    };
    return pair;
  });

  console.log("DAY FOUR  - Part One");

  console.log(
    `Total overlapping pairs: ${pairs
      .map((pair) => pair.isMatch)
      .reduce((accumulator, currentValue) => accumulator + currentValue)}\n`
  );

  console.log("DAY FOUR  - Part Two");
  console.log(`TODO \n\n`);
};

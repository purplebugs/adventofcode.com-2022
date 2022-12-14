import { readFileSync } from "fs";

export const day_6 = () => {
  const day_6 = "day-6.txt"; //  https://adventofcode.com/2022/day/6

  // Read file from disk
  const data = readFileSync(`./data/${day_6}`, "utf8");
  const signals = data.split("");

  const span = 4;
  let charsProcessed = 0;

  for (let i = 0; i < signals.length - (span - 1); i++) {
    // Create array of distinct chars
    const chars = signals.slice(i, i + span);
    const distinctChars = [...new Set(chars)];

    // console.log(chars);
    // console.log(distinctChars);
    // console.log(
    //   `${i}: ${signals[i]}${signals[i + 1]}${signals[i + 2]}${signals[i + 3]}\n`
    // );

    if (distinctChars.length === span) {
      charsProcessed = i + span;
      // Found unique set of adjacent chars
      break;
    }
  }
  console.log("DAY SIX - Part One");
  console.log(`Chars processed: ${charsProcessed}\n`);
  console.log("DAY SIX - Part Two");
  console.log(`TODO \n\n`);
};

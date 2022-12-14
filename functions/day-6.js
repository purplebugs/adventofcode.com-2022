import { readFileSync } from "fs";

export const day_6 = () => {
  const day_6 = "day-6.txt"; //  https://adventofcode.com/2022/day/6

  // Read file from disk
  const data = readFileSync(`./data/${day_6}`, "utf8");
  const signals = data.split("");

  const findAdjoiningUniqueCharsEndPosition = (signals, span) => {
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
        // Found unique set of adjacent chars
        return i + span;
      }
    }
  };

  console.log("DAY SIX - Part One");
  console.log(
    `Chars processed: ${findAdjoiningUniqueCharsEndPosition(signals, 4)}\n`
  );
  console.log("DAY SIX - Part Two");
  console.log(
    `Chars processed: ${findAdjoiningUniqueCharsEndPosition(signals, 14)}\n\n`
  );
};

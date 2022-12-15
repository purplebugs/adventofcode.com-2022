import { readFileSync } from "fs";

export const day_7 = () => {
  const day_7 = "day-7.txt"; //  https://adventofcode.com/2022/day/7

  // Read file from disk
  const data = readFileSync(`./data/${day_7}`, "utf8");
  const signals = data.split("");

  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];
  const countedNames = names.reduce((allNames, name) => {
    const currCount = allNames[name] ?? 0;

    return {
      ...allNames,
      [name]: currCount + 1,
    };
  }, {});
  // countedNames is:
  // { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }

  console.log("DAY SEVEN - Part One");
  //console.log(`TODO: ${JSON.stringify(countedNames)}\n`);
  console.log("DAY SEVEN - Part Two");
  console.log(`TODO: \n\n`);
};

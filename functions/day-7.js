import { readFileSync } from "fs";

export const day_7 = () => {
  const day_7 = "day-7.txt"; //  https://adventofcode.com/2022/day/7

  const data = readFileSync(`./data/${day_7}`, "utf8");
  const signals = data.split("\n"); //

  const commands = signals.map((signal, i) => {
    if (signal.startsWith("$ cd ")) {
      return {
        id: i,
        command: "cd",
        value: signal.substring(5),
      };
    }
    if (signal.startsWith("dir ")) {
      return {
        id: i,
        command: "dir",
        value: signal.substring(4),
      };
    }
    if (signal.startsWith("$ ls")) {
      return {
        id: i,
        command: "ls",
      };
    }
    const regex = RegExp(`([0-9])*`, "g");
    const fileSize = signal.match(regex);
    if (signal.match(regex)) {
      return {
        id: i,
        command: "file",
        size: fileSize[0],
        value: signal.substring(fileSize[0].length + 1),
      };
    }
  });

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
  //console.log(`TODO: ${JSON.stringify(commands)}\n`);
  console.log("DAY SEVEN - Part Two");
  console.log(`TODO: \n\n`);
};

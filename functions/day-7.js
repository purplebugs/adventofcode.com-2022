import { readFileSync } from "fs";

export const day_7 = () => {
  const day_7 = "day-7.txt"; //  https://adventofcode.com/2022/day/7

  const data = readFileSync(`./data/${day_7}`, "utf8");
  const commands = data.split("\n");

  let currentLevel = 0;
  let currentParent = 0;

  const entries = commands.map((command, i) => {
    if (command.startsWith("$ cd ")) {
      const value = command.substring(5);
      if (value === "/") {
        currentLevel = 0;
      }
      if (value === "..") {
        currentLevel -= 1;
      }
      if (value !== "/" && value !== "..") {
        currentLevel += 1;
      }
      return {
        id: i,
        command: "cd",
        value: value,
        level: currentLevel, // TODO
        parent: currentParent, // TODO
      };
    }
    if (command.startsWith("dir ")) {
      return {
        id: i,
        command: "dir",
        value: command.substring(4),
        level: currentLevel, // TODO
        parent: currentParent, // TODO
      };
    }
    if (command.startsWith("$ ls")) {
      return {
        id: i,
        command: "ls",
        level: currentLevel, // TODO
        parent: currentParent, // TODO
      };
    }
    const regex = RegExp(`([0-9])*`, "g");
    const fileSize = command.match(regex);
    if (command.match(regex)) {
      return {
        id: i,
        command: "file",
        size: fileSize[0],
        value: command.substring(fileSize[0].length + 1),
        level: currentLevel, // TODO
        parent: currentParent, // TODO
      };
    }
  });

  console.log("DAY SEVEN - Part One");
  console.log(`TODO: ${JSON.stringify(entries)}\n`);
  console.log("DAY SEVEN - Part Two");
  console.log(`TODO: \n\n`);
};

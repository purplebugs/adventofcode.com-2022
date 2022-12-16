import { readFileSync } from "fs";

export const day_7 = () => {
  const day_7 = "day-7.txt"; //  https://adventofcode.com/2022/day/7

  const data = readFileSync(`./data/${day_7}`, "utf8");
  const commands = data.split("\n");

  let level = 0;
  let parent = 0;
  const parents = new Map();

  const entries = commands.map((command, i) => {
    if (command.startsWith("$ cd ")) {
      const value = command.substring(5);
      let obj = { id: i, command: "cd", value: value };
      if (value === "/") {
        obj = {
          ...obj,
          level: 0,
          parent: null,
        };
        if (!parents.get(`0:${value}`)) {
          parents.set(`"0:${value}"`, i);
        }
      }
      if (value !== "/" && value !== "..") {
        level += 1;
        obj = {
          ...obj,
          level: level,
        };
      }
      if (value === "..") {
        level -= 1;
        obj = {
          ...obj,
          level: level,
        };
      }

      return obj;
    }
    if (command.startsWith("dir ")) {
      const value = command.substring(4);
      // console.log(`${level}:${value}`);
      // console.log(parents.get("0:a"));
      // console.log("*****");
      if (!parents.get(`${level - 1}:${value}`)) {
        parents.set(`"${level}:${value}"`, i);
      }
      return {
        id: i,
        command: "dir",
        value: value,
        level: level,
        parent: parents.get(`${level}:${value}`),
      };
    }
    if (command.startsWith("$ ls")) {
      return {
        id: i,
        command: "ls",
        level: level,
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
        level: level,
        parent: parents.get(level - 1),
      };
    }
  });

  function logMapElements(value, key) {
    console.log(`parents[${key}] = ${value}`);
  }

  // parents.forEach(logMapElements);

  console.log("DAY SEVEN - Part One");
  //console.log(`TODO: ${JSON.stringify(entries)}\n`);
  console.log("DAY SEVEN - Part Two");
  console.log(`TODO: \n\n`);
};

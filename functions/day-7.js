import { readFileSync } from "fs";

export const day_7 = () => {
  const day_7 = "day-7.txt"; //  https://adventofcode.com/2022/day/7

  const data = readFileSync(`./data/${day_7}`, "utf8");
  const commands = data.split("\n");

  let level = 0;
  const parents = new Map();

  const entries = commands
    .map((command, i) => {
      if (command.startsWith("$ cd ")) {
        const value = command.substring(5);
        let obj = { id: i, command: "cd", value: value };
        if (value === "/") {
          obj = {
            ...obj,
            level: 0,
          };
          const rootParent = parents.get(`0:${value}`);
          if (rootParent === undefined) {
            parents.set(`0:${value}`, i);
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
        parents.set(`${level}:${value}`, i);
        return {
          id: i,
          command: "dir",
          value: value,
          level: level,
          children: [],
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
        };
      }
    })
    .filter((entry) => entry.command !== "ls")
    .filter((entry) => entry.command !== "cd");

  console.log("DAY SEVEN - Part One");
  function logMapElements(value, key) {
    console.log(`parents[${key}] = ${value}`);
  }

  // parents.forEach(logMapElements);

  const toTree = (entries) => {
    console.log("toTree");
    return entries.map((entry, i) => {
      console.log("******", i);

      const nextObj = {};
      for (const [key, value] of Object.entries(entry)) {
        console.log(`${key}: ${JSON.stringify(value)}`);

        // TODO fill out values in recursion
        // currently returns: [{"children":[]},null,null,{"children":[]},{"children":[]},null,null,null,null,null,null,null,null]
        if (key == "children") {
          console.log(`ENTRY: ${JSON.stringify(entry.level)}`);
          nextObj[key] = toTree(
            entries.filter((entry) => entry.level == "TODO")
          );
          return nextObj;
        }
      }
    });
  };

  // console.log(`TODO: ${JSON.stringify(entries)}\n`);
  //console.log(`TODO: ${JSON.stringify(toTree(entries))}\n`);
  console.log("DAY SEVEN - Part Two");
  console.log(`TODO: \n\n`);
};

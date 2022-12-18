import { readFileSync } from "fs";

export const day_7 = () => {
  const day_7 = "day-7.txt"; //  https://adventofcode.com/2022/day/7

  const data = readFileSync(`./data/${day_7}`, "utf8");
  const commands = data.split("\n");

  let level = 0;

  const cleanCommands = commands
    .map((command, i) => {
      if (command.startsWith("$ cd ")) {
        const value = command.substring(5);
        let obj = { id: i, command: "cd", value: value };
        if (value === "/") {
          level = 0;
          obj = {
            ...obj,
            level: level,
          };
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

  cleanCommands.unshift({
    command: "dir",
    value: "/",
    level: 0,
    children: [],
  });

  console.log("DAY SEVEN - Part One");

  const toTree = (nodes) => {
    return nodes.map((node) => {
      // if (!node.level) {
      //   return node;
      // }
      // if (Object.hasOwn(node, "anita")) {
      //   return node;
      // }
      const level = node.level;

      for (const [key, value] of Object.entries(node)) {
        const nextObj = {
          command: "dir",
          value: node[value],
        };
        //console.log(`HELLO ${key}: ${JSON.stringify(value)}`);

        // TODO fill out values in recursion
        if (key == "children") {
          //console.log(`NODE: ${JSON.stringify(node)}`);
          nextObj[key] = toTree(
            nodes.filter(
              (node) => node.level == level && node.command == "file"
            ) // return nodes from array with matching level
          );
          return { ...nextObj }; // TODO return the other fields as is
        }
      }
    });
  };

  //console.log(`TODO: ${JSON.stringify(cleanCommands)}\n`);
  //console.log("*************");
  //console.log(`TODO: ${JSON.stringify(toTree(cleanCommands))}\n`);
  console.log("DAY SEVEN - Part Two");
  console.log(`TODO: \n\n`);
};

import { readFileSync } from "fs";

export const day_7 = () => {
  const day_7 = "day-7.txt"; //  https://adventofcode.com/2022/day/7

  const data = readFileSync(`./data/${day_7}`, "utf8");
  const commands = data.split("\n");

  let level = 0;
  const parents = new Map();

  const cleanCommands = commands.map((command, i) => {
    if (command.startsWith("$ cd ")) {
      const value = command.substring(5);
      let obj = { id: i, command: "cd", value: value };
      if (value === "/") {
        // Naive, assume only ever have "$ cd /" once
        obj = {
          id: i,
          command: "dir",
          value: value,
          level: 0,
          children: [],
        };
        if (!parents.get(`0:${value}`)) {
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
      if (!parents.get(`${level - 1}:${value}`)) {
        parents.set(`${level}:${value}`, i);
      }
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
  });

  console.log("DAY SEVEN - Part One");

  const toTree = (nodes) => {
    let currentChildren = [];
    let children = [];
    let parentNodeId = null;
    let parentNode = null;
    return nodes.reverse().map((node) => {
      console.log(node);
      // Reverse input to process from bottom up to simplify exit conditions logic
      if (node.command == "file" || node.command == "dir") {
        return currentChildren.push(node);
      }

      if (node.command === "ls") {
        // clear accumulators
        children = currentChildren;
        currentChildren = [];
        parentNodeId = null;
        return;
      }
      if (node.command === "cd" && node.value !== ".." && node.value !== "/") {
        parentNodeId = parents.get(`${node.level - 1}:${node.value}`);
        parentNode = nodes.find((node) => node.id == parentNodeId);
        console.log(`parentNode: ${JSON.stringify(parentNode)}`);
        console.log(`children: ${JSON.stringify(children)}`);
        // TODO add children to the parentNode // (node.children = [...children])
        return; // TODO recursive
      }
    });
  };

  function logMapElements(value, key) {
    console.log(`parents[${key}] = ${value}`);
  }

  //parents.forEach(logMapElements);
  //console.log("*************");
  //console.log(`TODO: ${JSON.stringify(cleanCommands)}\n`);
  console.log("*************");
  console.log(`TODO: ${JSON.stringify(toTree(cleanCommands))}\n`);
  console.log("DAY SEVEN - Part Two");
  console.log(`TODO: \n\n`);
};

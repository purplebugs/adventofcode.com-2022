import { readFileSync } from "fs";

class Node {
  constructor(type = "", name = "", size = 0) {
    this.type = type;
    this.name = name;
    this.size = size;
    this.children = [];
    this.parent;
  }

  addChild(node) {
    this.children.push(node);
  }

  cd(name) {
    if (name === "..") {
      return this.parent;
    }

    if (name !== "..") {
      return this.children.filter((child) => child.name === name)[0]; // Should only be one unique dir name in children list
    }

    return this; // Safeguard to when get to root dir;
  }

  addParent(node) {
    this.parent = node;
  }

  getChildrenSize() {
    // TODO calculate sum of children
  }

  toJSON() {
    return {
      name: this.name,
      size: this.size,
      type: this.type,
      children: this.children,
      // do not print out parent to avoid circular dependencies when console.log
    };
  }
}

export const day_7 = () => {
  const day_7 = "day-7.txt"; //  https://adventofcode.com/2022/day/7
  const data = readFileSync(`./data/${day_7}`, "utf8");
  const commands = data.split("\n");
  let fileTree = new Node("dir", "root"); // Naive, assume only ever have "$ cd /" once, and this is hardcoded
  let currentPosition = fileTree;
  let level = 0;

  commands.forEach((command) => {
    if (command.startsWith("$ cd ")) {
      const value = command.substring(5);

      if (value === "/") {
        // Do nothing, handled when initite fileTree
        return;
      }

      currentPosition = currentPosition.cd(value);
      return;
    }

    if (command.startsWith("dir ")) {
      const value = command.substring(4);
      const node = new Node("dir", value);
      node.addParent(currentPosition);
      currentPosition.addChild(node);
    }

    if (command.startsWith("$ ls")) {
      return;
    }

    const regex = RegExp(`([0-9])*`, "g");
    const fileSize = command.match(regex);
    if (command.match(regex)) {
      fileTree.addChild(
        "dir",
        command.substring(fileSize[0].length + 1),
        fileSize[0]
      );
    }
  });

  console.log("DAY SEVEN - Part One");

  console.log("*************");
  console.log(`TODO: ${JSON.stringify(fileTree)}\n`);
  console.log("DAY SEVEN - Part Two");
  console.log(`TODO: \n\n`);
};

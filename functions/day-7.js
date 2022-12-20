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

  getShallowSize() {
    // No need to check node type since all nodes are initiated with size=0 unless it is type="file"
    let sum = 0;

    this.children.forEach((child) => {
      sum = sum + child.size;
    });
    return sum;
  }

  getDeepSize() {
    let sum = 0;

    this.children.forEach((child) => {
      sum = sum + child.size;
      sum = sum + child.getDeepSize();
    });

    return sum;
  }

  toJSON() {
    return {
      name: this.name,
      size: this.size,
      type: this.type,
      children: this.children,
      //this.parent, do not print out parent to avoid circular dependencies when console.log
      shallowSize: this.getShallowSize(), // Just to test function getChildrenSize() which is called when do JSON.stringify()
      getDeepSize: this.getDeepSize(),
    };
  }
}

export const day_7 = () => {
  const day_7 = "day-7.txt"; //  https://adventofcode.com/2022/day/7
  const data = readFileSync(`./data/${day_7}`, "utf8");
  const commands = data.split("\n");
  let fileTree = new Node("dir", "root"); // Naive, assume only ever have "$ cd /" once, and this is hardcoded
  let currentPosition = fileTree;

  commands.forEach((command) => {
    if (command.startsWith("$ cd ")) {
      const value = command.substring(5);

      if (value === "/") {
        // Do nothing, handled when initiate fileTree
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

    const regex = RegExp(`([0-9]+)`, "g");
    const size = parseInt(command.match(regex));
    if (command.match(regex)) {
      const value = command.split(" ")[1]; // Filename is the second element eg [ '8033020', 'd.log' ]
      const node = new Node("file", value, size);
      currentPosition.addChild(node);
    }
  });

  console.log("*************");
  console.log(`TODO: ${JSON.stringify(fileTree)}\n`);
  console.log("DAY SEVEN - Part One");

  console.log(`sumDirectorySize: ${fileTree.getDeepSize()}`);
  console.log("DAY SEVEN - Part Two");
  console.log(`TODO: \n\n`);
};

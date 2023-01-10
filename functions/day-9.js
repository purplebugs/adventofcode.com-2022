import { readFileSync } from "fs";

//const day_9_data = "day-9-example.txt"; //  https://adventofcode.com/2022/day/9
const day_9_data = "day-9.txt"; //  https://adventofcode.com/2022/day/9

const data = readFileSync(`./data/${day_9_data}`, "utf8");

const rawInstructions = data.split("\n");

const getInstructions = () => {
  let instructions = rawInstructions.map((instructionLine) => {
    // ["R 4", "L 2"] -> [[R,R,R,R],[L,L]]

    let instruction = [];
    const repeater = +instructionLine.substring(1);
    for (let i = 1; i <= repeater; i++) {
      instruction.push(instructionLine[0]);
    }
    return instruction;
  });

  instructions = instructions.flatMap((instruction) => instruction); // -> [[R,R,R,R],[L,L]] -> [R,R,R,R,L,L]
  return instructions;
};

class Point {
  constructor(x = 0, y = 0, type) {
    this.x = x;
    this.y = y;
    this.type = type; // "H" or "T"
  }

  // toJSON() {
  //   return { x: this.x, y: this.y };
  // }
}

class Matrix {
  constructor(x = 0, y = 0) {
    this.currentHead = new Point(x, y, "H");
    this.currentTail = new Point(x, y, "T");
    this.visitedHeadPositions = [
      {
        x: this.currentHead.x,
        y: this.currentHead.y,
      },
    ];
    this.visitedTailPositions = [
      {
        x: this.currentTail.x,
        y: this.currentTail.y,
      },
    ];
  }

  isApart() {
    let isApart = false;
    if (Math.abs(this.currentHead.x - this.currentTail.x) > 1) {
      isApart = true;
    }
    if (Math.abs(this.currentHead.y - this.currentTail.y) > 1) {
      isApart = true;
    }
    return isApart;
  }

  create() {
    const instructions = getInstructions();
    this.matrix = instructions.forEach((instruction) => {
      let previousHead = this.currentHead;
      if (instruction === "R") {
        this.currentHead = new Point(
          this.currentHead.x + 1,
          this.currentHead.y,
          "H"
        );
      }
      if (instruction === "L") {
        this.currentHead = new Point(
          this.currentHead.x - 1,
          this.currentHead.y,
          "H"
        );
      }
      if (instruction === "U") {
        this.currentHead = new Point(
          this.currentHead.x,
          this.currentHead.y + 1,
          "H"
        );
      }
      if (instruction === "D") {
        this.currentHead = new Point(
          this.currentHead.x,
          this.currentHead.y - 1,
          "H"
        );
      }

      if (this.isApart()) {
        this.currentTail = previousHead;
        this.visitedTailPositions.push({
          x: this.currentTail.x,
          y: this.currentTail.y,
        });
      }
      this.visitedHeadPositions.push({
        x: this.currentHead.x,
        y: this.currentHead.y,
      });
    });
  }
}

export const day_9 = () => {
  const matrix = new Matrix();
  matrix.create();
  let distinctPositions = new Map();

  matrix.visitedTailPositions.forEach((position) => {
    if (!distinctPositions.has(`${position.x}:${position.y}`)) {
      distinctPositions.set(`${position.x}:${position.y}`);
    }
  });

  console.log("DAY NINE\n");

  console.log(`1: ${distinctPositions.size}`);
  console.log(`2: TODO \n\n`);
  // console.log(JSON.stringify(matrix, null, 2));
};

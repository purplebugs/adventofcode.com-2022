import { readFileSync } from "fs";

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

const calcuateTouching = (a, b) => {
  return Math.abs(a - b) <= 1;
};

class Matrix {
  constructor(x = 0, y = 0) {
    this.width = 0;
    this.height = 0;
    this.currentHead = new Point(x, y, "H", true);
    this.currentTail = new Point(x, y, "T", true);
    this.visitedTailPositions = [
      {
        x: this.currentTail.x,
        y: this.currentTail.y,
      },
    ];
  }

  isTouching() {
    let isTouching = false;
    if (Math.abs(this.currentHead.x - this.currentTail.x) > -1) {
      isTouching = true;
    }
    if (Math.abs(this.currentHead.y - this.currentTail.y) > -1) {
      isTouching = true;
    }
    return isTouching;
  }

  create(data = "") {
    const rawInstructions = data.split("\n");
    let instructions = rawInstructions.map((instructionLine) => {
      // format eg ["R 4", "L 2"] as [R,R,R,R,L,L]

      let instruction = [];
      const repeater = +instructionLine[2];
      for (let i = 1; i <= repeater; i++) {
        instruction.push(instructionLine[0]);
      }
      return instruction;
    });

    instructions = instructions.flatMap((instruction) => instruction);

    this.matrix = instructions.forEach((instruction) => {
      if (instruction === "R") {
        this.width = this.width + 1;
        this.currentHead = new Point(
          this.currentHead.x + 1,
          this.currentHead.y,
          "H"
        );
      }
      if (instruction === "L") {
        this.width = this.width - 1;
        this.currentHead = new Point(
          this.currentHead.x - 1,
          this.currentHead.y,
          "H"
        );
      }
      if (instruction === "U") {
        this.height = this.height + 1;
        this.currentHead = new Point(
          this.currentHead.y + 1,
          this.currentHead.y,
          "H"
        );
      }
      if (instruction === "D") {
        this.height = this.height - 1;
        this.currentHead = new Point(
          this.currentHead.y - 1,
          this.currentHead.y,
          "H"
        );
      }

      if (this.isTouching()) {
        this.currentTail = this.currentHead;
        this.visitedTailPositions.push({
          x: this.currentTail.x,
          y: this.currentTail.y,
        });
      }
    });
  }
}

export const day_9 = () => {
  const day_9 = "day-9-example.txt"; //  https://adventofcode.com/2022/day/9
  // const day_9 = "day-9.txt"; //  https://adventofcode.com/2022/day/9

  const data = readFileSync(`./data/${day_9}`, "utf8");
  const matrix = new Matrix();
  matrix.create(data);

  console.log("DAY NINE\n");

  console.log(`1: TODO `);
  console.log(`2: TODO \n\n`);
  console.log(JSON.stringify(matrix, null, 2));
};

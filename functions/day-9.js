import { readFileSync } from "fs";

class Point {
  constructor(x = 0, y = 0, type, isTouching) {
    this.x = x;
    this.y = y;
    this.type = type; // "H" or "T"
    this.isTouching = isTouching;
  }

  // toJSON() {
  //   return { x: this.x, y: this.y };
  // }
}

class Matrix {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.currentHead = new Point();
    this.currentTail = new Point();
    this.visitedTailPositions = [];
  }

  create(data = "") {
    const instructionLines = data.split("\n");

    let x = 0;
    let y = 0;
    let head = new Point(x, y, "H", true);
    let tail = new Point(x, y, "T", true);
    this.visitedTailPositions.push({
      x: tail.x,
      y: tail.y,
    });

    this.matrix = instructionLines.forEach((line) => {
      const toInstructionLine = line.split(" ");

      // TODO handle toInstructionLine[1] as currently assumes number is always 1
      // TODO handle L, U, D
      if (toInstructionLine[0] === "R") {
        x = x + 1;
        this.width = this.width + 1; // TODO update this.width, this.height as appropriate
        // TODO create new Point item
        this.currentHead = new Point(
          this.currentHead.x + 1,
          head.y,
          "H",
          head.isTouching
        ); // TODO handle isTouching value
        this.currentTail = tail;
        this.visitedTailPositions.push({
          x: tail.x,
          y: tail.y,
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

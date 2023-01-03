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

  isTouching(head, tail) {
    let isTouching = false;
    if (head.x === tail.x) {
      isTouching = true;
    }
    if (head.y === tail.y) {
      isTouching = true;
    }
    // TODO add logic for one space apart in any direction
    return isTouching;
  }

  create(data = "") {
    const instructionLines = data.split("\n");

    let head = this.currentHead;
    let tail = this.currentTail;
    let previousHeadPosition = this.currentHead;

    this.matrix = instructionLines.forEach((line) => {
      const toInstructionLine = line.split(" ");

      // console.log("this.isTouching(head, tail)", this.isTouching(head, tail));
      // TODO bugfix logic
      if (!this.isTouching(head, tail)) {
        console.log("is NOT touching");
        this.currentTail = previousHeadPosition;
        this.visitedTailPositions.push({
          x: currentTail.x,
          y: currentTail.y,
        });
      }

      // TODO handle toInstructionLine[1] as currently assumes number is always 1
      // TODO handle L, U, D
      if (toInstructionLine[0] === "R") {
        this.width = this.width + 1; // TODO update this.width, this.height as appropriate

        console.log("previousHeadPosition", previousHeadPosition);
        previousHeadPosition = this.currentHead;
        this.currentHead = new Point(this.currentHead.x + 1, head.y, "H");
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

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

  isTouching(head, tail) {
    let isTouching = false;
    if (Math.abs(head.x - tail.x) > -1) {
      isTouching = true;
    }
    // TODO add logic for one space apart in any direction
    return isTouching;
  }

  create(data = "") {
    const rawInstructions = data.split("\n");
    let instructions = rawInstructions.map((instruction) => {
      // format eg ["R 4", "L 2"] as [R,R,R,R,L,L]

      let instructionsWithRepeater = [];
      const repeater = +instruction[2];
      for (let i = 1; i <= repeater; i++) {
        instructionsWithRepeater.push(instruction[0]);
      }
      return instructionsWithRepeater;
    });

    instructions = instructions.flatMap((instruction) => instruction);
    console.log(instructions);

    let head = this.currentHead;
    let tail = this.currentTail;

    this.matrix = instructions.forEach((line) => {
      const toInstructionLine = line.split(" ");

      if (this.isTouching(head, tail)) {
        // console.log("is touching");
        // console.log("this.isTouching(head, tail)", this.isTouching(head, tail));
        this.currentTail = this.currentHead;
        this.visitedTailPositions.push({
          x: this.currentTail.x,
          y: this.currentTail.y,
        });
      }

      // TODO handle L, U, D
      if (toInstructionLine[0] === "R") {
        this.width = this.width + 1;
        this.currentHead = new Point(this.currentHead.x + 1, head.y, "H");
      }
      if (toInstructionLine[0] === "L") {
        this.width = this.width - 1;
        this.currentHead = new Point(this.currentHead.x - 1, head.y, "H");
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

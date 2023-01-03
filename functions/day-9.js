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
  constructor(matrix = []) {
    this.matrix = matrix;
    this.currentHeadPosition = new Point();
    this.currentTailPosition = new Point();
    this.visitedTailPositions = new Set();
  }

  create(data = "") {
    const instructionLines = data.split("\n");

    // Put array in array to make 2D array
    let x = 0;
    let y = 0;
    this.matrix = instructionLines.map((line) => {
      const toInstructionLine = line.split(" ");
      const toArrayOfState = []; // indicated by one of the chars: . H T

      if (toInstructionLine[0] === "R") {
        // TODO handle L, U, D
        // TODO increment x,y as appropriate
        // TODO create new Point item
        // TODO update currentHeadPosition
        // TODO update currentTailPosition
        // TODO update visitedTailPositions
        // TODO toArrayOfState.push(item)
      }
      // TODO handle toInstructionLine[1] as currently assumes number is always 1

      return toArrayOfState;
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

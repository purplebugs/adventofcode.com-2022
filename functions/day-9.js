import { readFileSync } from "fs";

//const day_9_data = "day-9-example.txt"; //  https://adventofcode.com/2022/day/9
// const day_9_data = "day-9-example-part-2.txt"; //  https://adventofcode.com/2022/day/9
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
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // toJSON() {
  //   return { x: this.x, y: this.y };
  // }
}

class Matrix {
  constructor(x = 0, y = 0) {
    this.snake = [
      new Point(x, y),
      new Point(x, y),
      // new Point(x, y),
      // new Point(x, y),
      // new Point(x, y),
      // new Point(x, y),
      // new Point(x, y),
      // new Point(x, y),
      // new Point(x, y),
      // new Point(x, y),
    ];

    this.last = this.snake.length - 1;
    this.previousPosition = this.snake[0];
    this.visitedHeadPositions = [
      {
        x: this.snake[0].x,
        y: this.snake[0].y,
      },
    ];
    this.visitedTailPositions = [
      {
        x: this.snake[this.last].x,
        y: this.snake[this.last].y,
      },
    ];
  }

  isApart(position) {
    let isApart = false;
    if (Math.abs(this.snake[position].x - this.snake[position + 1].x) > 1) {
      isApart = true;
    }
    if (Math.abs(this.snake[position].y - this.snake[position + 1].y) > 1) {
      isApart = true;
    }
    return isApart;
  }

  move(position, instruction) {
    if (instruction === "R") {
      this.snake[position] = new Point(
        this.snake[position].x + 1,
        this.snake[position].y
      );
    }
    if (instruction === "L") {
      this.snake[position] = new Point(
        this.snake[position].x - 1,
        this.snake[position].y
      );
    }
    if (instruction === "U") {
      this.snake[position] = new Point(
        this.snake[position].x,
        this.snake[position].y + 1
      );
    }
    if (instruction === "D") {
      this.snake[position] = new Point(
        this.snake[position].x,
        this.snake[position].y - 1
      );
    }
  }

  create() {
    const instructions = getInstructions();
    this.matrix = instructions.forEach((instruction) => {
      for (let i = 0; i < this.last; i++) {
        this.previousPosition = this.snake[i];
        this.move(i, instruction);
        if (this.isApart(i)) {
          this.snake[i + 1] = this.previousPosition;
          this.visitedTailPositions.push({
            x: this.snake[this.last].x,
            y: this.snake[this.last].y,
          });
        }

        this.visitedHeadPositions.push({
          x: this.snake[0].x,
          y: this.snake[0].y,
        });
      }
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

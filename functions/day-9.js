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

class Snake {
  constructor({ x = 0, y = 0, size = 2 } = {}) {
    // Using constructor arguments: { x = 0, y = 0, size = 2 }
    // and destructuring: = {}
    // which merges the object passed into the class with the default values: const snake1 = new Snake({ size: 10 });
    this.snake = [];

    for (let i = 0; i < size; i++) {
      this.snake.push(new Point(x, y));
    }

    this.last = this.snake.length - 1;
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

  distinctTailPositionsVisited() {
    let distinctPositions = new Set();

    this.visitedTailPositions.forEach((position) => {
      if (!distinctPositions.has(`${position.x}:${position.y}`)) {
        distinctPositions.add(`${position.x}:${position.y}`);
      }
    });

    return distinctPositions.size;
  }

  isApart(position) {
    let isApart = false;
    let newX = this.snake[position].x;
    let newY = this.snake[position].y;
    if (Math.abs(this.snake[position].x - this.snake[position + 1].x) > 1) {
      isApart = true;
      newX =
        this.snake[position].x - this.snake[position + 1].x >= 0
          ? this.snake[position].x - 1
          : this.snake[position].x + 1;
    }
    if (Math.abs(this.snake[position].y - this.snake[position + 1].y) > 1) {
      isApart = true;
      newY =
        this.snake[position].y - this.snake[position + 1].y >= 0
          ? this.snake[position].y - 1
          : this.snake[position].y + 1;
    }
    return { isApart, newPosition: { x: newX, y: newY } };
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
    const previousPos = [];
    instructions.forEach((instruction) => {
      this.snake.forEach((position, index) => {
        // console.log(previousPos);
        if (index === 0) {
          previousPos.splice(index, 1, new Point(position.x, position.y));
          this.move(0, instruction); // always move head
        }
        if (index < this.snake.length - 1 && this.isApart(index).isApart) {
          previousPos.splice(index + 1, 1, this.snake[index + 1]);
          this.snake[index + 1] = this.isApart(index).newPosition; //previousPos[index]; // this.isApart(index).newPosition; // TODO explore using newPosition
        }

        this.visitedHeadPositions.push({
          x: this.snake[0].x,
          y: this.snake[0].y,
        });
        this.visitedTailPositions.push({
          x: this.snake[this.last].x,
          y: this.snake[this.last].y,
        });
      });
    });
  }
}

export const day_9 = () => {
  const snake1 = new Snake({ size: 2 });
  snake1.create();

  const snake2 = new Snake({ size: 10 });
  snake2.create();

  console.log("DAY NINE\n");

  console.log(`1: ${snake1.distinctTailPositionsVisited()}`);
  console.log(`2: ${snake2.distinctTailPositionsVisited()}`);
  //console.log(JSON.stringify(snake, null, 2));
};

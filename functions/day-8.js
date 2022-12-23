import { readFileSync } from "fs";

class Point {
  constructor(x = 0, y = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.height = height;
  }

  toJSON() {
    return this.height;
  }
}

class Matrix {
  constructor(matrix = []) {
    this.matrix = matrix;
  }

  create(data = "") {
    const numberLines = data.split("\n");

    // Put array in array to make 2D array
    let x = 0;
    this.matrix = numberLines.map((line) => {
      const toInt = line.split("");
      const toArrayOfInt = [];
      let y = 0;
      toInt.forEach((char) => {
        const item = new Point(x, y, +char);
        toArrayOfInt.push(item);
        y++;
      });
      x++;
      return toArrayOfInt;
    });
  }

  isVisibleOnRight(point) {
    const row = this.matrix[point.x].slice(point.y + 1);
    const found = row.find((neighbour) => neighbour.height >= point.height);
    return !found ? true : false;
  }

  isVisibleOnLeft(point) {
    const row = this.matrix[point.x].slice(0, point.y);
    const found = row.find((neighbour) => neighbour.height >= point.height);
    return !found ? true : false;
  }

  isVisibleAbove(point) {
    let column = this.matrix.map((row) => {
      return row[point.y];
    });
    column = column.slice(0, point.x);
    const found = column.find((neighbour) => neighbour.height >= point.height);
    return !found ? true : false;
  }

  isVisibleBelow(point) {
    let column = this.matrix.map((row) => {
      return row[point.y];
    });
    column = column.slice(point.x + 1);
    const found = column.find((neighbour) => neighbour.height >= point.height);
    return !found ? true : false;
  }

  isVisible(point) {
    return (
      this.isVisibleOnRight(point) ||
      this.isVisibleOnLeft(point) ||
      this.isVisibleAbove(point) ||
      this.isVisibleBelow(point)
    );
  }

  count() {
    const visibleTrees = [];

    this.matrix.forEach((row) => {
      row.forEach((item) => {
        if (this.isVisible(item)) {
          visibleTrees.push(item);
        }
      });
    });

    return visibleTrees.length;
  }
}

export const day_8 = () => {
  // const day_8 = "day-8-example.txt"; //  https://adventofcode.com/2022/day/8
  const day_8 = "day-8.txt"; //  https://adventofcode.com/2022/day/8

  const data = readFileSync(`./data/${day_8}`, "utf8");
  const matrix = new Matrix();
  matrix.create(data);

  console.log("DAY EIGHT\n");
  // console.log(JSON.stringify(matrix.matrix, null, 2));
  console.log(matrix.count());
  //console.log(`2: TODO \n\n`);
};

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
    let y = 0;
    this.matrix = numberLines.map((line) => {
      const toInt = line.split("");
      const toArrayOfInt = [];

      toInt.forEach((char) => {
        const item = new Point(x, y, +char);
        toArrayOfInt.push(item);
        //console.log("item", item);
        x++;
      });
      y++;
      x = 0;
      return toArrayOfInt;
    });
  }

  isVisibleOnRight(point) {
    const row = this.matrix[point.y].slice(point.x + 1);
    const found = row.find((neighbour) => neighbour.height >= point.height);
    return !found ? true : false;
  }

  isVisibleOnLeft(point) {
    const row = this.matrix[point.y].slice(0, point.x);
    const found = row.find((neighbour) => neighbour.height >= point.height);
    return !found ? true : false;
  }

  isVisibleAbove(point) {
    let column = this.matrix.map((row) => {
      return row[point.x];
    });

    column = column.slice(0, point.y);
    const found = column.find((neighbour) => neighbour.height >= point.height);
    return !found ? true : false;
  }

  isVisibleBelow(point) {
    let column = this.matrix.map((row) => {
      return row[point.x];
    });
    column = column.slice(point.y + 1);
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

  // viewOnRight(point) {
  //   const row = this.matrix[point.x].slice(point.y + 1);
  //   const found = row.filter((neighbour) => neighbour.height <= point.height);
  //   return found.length;
  // }

  // viewOnLeft(point) {
  //   let row = this.matrix[point.x].slice(0, point.y);
  //   console.log(row);
  //   row.reverse();
  //   console.log(row);
  //   const found = row.filter((neighbour) => neighbour.height <= point.height);
  //   console.log(found);
  //   return found.length;
  // }

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
  //const day_8 = "day-8-example.txt"; //  https://adventofcode.com/2022/day/8
  const day_8 = "day-8.txt"; //  https://adventofcode.com/2022/day/8

  const data = readFileSync(`./data/${day_8}`, "utf8");
  const matrix = new Matrix();
  matrix.create(data);

  console.log("DAY EIGHT\n");
  // console.log(JSON.stringify(matrix, null, 2));
  console.log(`1: ${matrix.count()}`);
  // console.log(
  //   `${matrix.isVisibleBelow({
  //     x: 2,
  //     y: 3,
  //     height: 5,
  //   })}`
  // );
};

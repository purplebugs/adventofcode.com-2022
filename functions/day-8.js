import { readFileSync } from "fs";

class Matrix {
  constructor(content = []) {
    this.content = content;
  }

  getWidth() {
    let count = 0;
    count = this.content[0].length;
    return count;
  }

  getLength() {
    let count = 0;
    count = this.content.length;
    return count;
  }

  getEdgeCount() {
    let count = 0;
    count = count + this.getWidth() * 2; // top and bottom rows - width
    count = count + this.getLength() * 2; // left and right column - length
    count = count - 4; // minus row corners already counted
    return count;
  }

  visibleOnRight(x, y) {
    const number = this.content[x][y];
    let row = this.content[x];
    row.splice(0, y + 1);
    const found = row.find((neighbour) => neighbour >= number);
    return !found ? true : false;
  }

  visibleOnLeft(x, y) {
    const number = this.content[x][y];
    let row = this.content[x];
    row.splice(y);
    const found = row.find((neighbour) => neighbour >= number);
    return !found ? true : false;
  }

  visibleAbove(x, y) {
    const number = this.content[x][y];

    let column = this.content.map((row) => {
      return row[y];
    });
    column.splice(x);
    const found = column.find((neighbour) => neighbour >= number);
    return !found ? true : false;
  }

  // TODO
  /*   visibleBelow(x, y) {
    const number = this.content[x][y];
    console.log(number);
    let column = this.content.map((row) => {
      return row[y];
    });
    console.log(column);
    column.splice(x);
    console.log(column);
    const found = column.find((neighbour) => neighbour >= number);
    return !found ? true : false;
  } */

  create(data = "") {
    const numberLines = data.split("\n");

    // Put array in array to make 2D array
    this.content = numberLines.map((line) => {
      const toInt = line.split("");
      const toArrayOfInt = [];
      toInt.forEach((char) => toArrayOfInt.push(+char));
      return toArrayOfInt;
    });
  }
}

export const day_8 = () => {
  const day_8 = "day-8-example.txt"; //  https://adventofcode.com/2022/day/8
  //const day_8 = "day-8.txt"; //  https://adventofcode.com/2022/day/8

  const data = readFileSync(`./data/${day_8}`, "utf8");
  const matrix = new Matrix();
  matrix.create(data);

  console.log("DAY EIGHT\n");
  console.log(matrix.content);
  console.log(matrix.visibleAbove(3, 0));
  console.log(`2: TODO \n\n`);
};

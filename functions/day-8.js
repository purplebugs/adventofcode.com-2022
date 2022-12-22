import { readFileSync } from "fs";

class Matrix {
  constructor(content = []) {
    this.content = content;
    this.edgeTreesCount = 0;
  }

  getRowsCount() {
    let count = 0;
    count = this.content.length;
    return count;
  }

  getColumnsCount() {
    let count = 0;
    count = this.content[0].length;
    return count;
  }

  getEdgeCount() {
    return;
  }

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
  console.log(matrix.getRowsCount());
  console.log(matrix.getColumnsCount());
  console.log(`2: TODO \n\n`);
};

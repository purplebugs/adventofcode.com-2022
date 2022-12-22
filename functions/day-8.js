import { readFileSync } from "fs";

class Matrix {
  constructor() {
    this.content = [];
  }

  create(data = "") {
    let numberArray = [];
    const numberLines = data.split("\n");

    numberArray = numberLines.map((line) => {
      const toInt = line.split("");
      const toArrayOfInt = [];
      toInt.forEach((char) => toArrayOfInt.push(+char));
      return toArrayOfInt;
    });

    this.content.push(numberArray); // Put array in array to make 2D array
  }
}

export const day_8 = () => {
  const day_8 = "day-8-example.txt"; //  https://adventofcode.com/2022/day/8
  //const day_8 = "day-8.txt"; //  https://adventofcode.com/2022/day/8

  const data = readFileSync(`./data/${day_8}`, "utf8");
  const matrix = new Matrix();
  matrix.create(data);

  console.log("DAY EIGHT\n");
  console.log(`${JSON.stringify(matrix.content)}`);
  console.log(`2: TODO \n\n`);
};

import { readFileSync } from "fs";

export const day_8 = () => {
  const day_8 = "day-8-example.txt"; //  https://adventofcode.com/2022/day/8

  const data = readFileSync(`./data/${day_8}`, "utf8");
  const numberLines = data.split("\n");
  let numberArray = [];
  const matrixArray = [];

  numberArray = numberLines.map((line) => {
    const toInt = line.split("");
    const toArrayOfInt = [];
    toInt.forEach((char) => toArrayOfInt.push(+char));
    return toArrayOfInt;
  });

  matrixArray.push(numberArray); // Put array in array to make 2D array

  console.log("DAY EIGHT\n");
  console.log(`1: TODO ${JSON.stringify(numberArray)}`);
  console.log(`${JSON.stringify(matrixArray)}`);
  console.log(`2: TODO \n\n`);
};

import { readFileSync } from "fs";

const day_1 = "day-1.txt"; //  https://adventofcode.com/2022/day/1

// Read file from disk
const data = readFileSync(`./data/${day_1}`, "utf8");

const arrayOfText = data.split("\n");

let caloriesPerElf = [];
let totalCaloriesOfCurrentElf = 0;
arrayOfText.forEach((item) => {
  if (item !== "") {
    totalCaloriesOfCurrentElf = parseInt(item) + totalCaloriesOfCurrentElf;
  }
  if (item === "") {
    caloriesPerElf.push(totalCaloriesOfCurrentElf);
    totalCaloriesOfCurrentElf = 0;
  }
});

console.log(`List of calories per elf: ${caloriesPerElf}`);
console.log(`Number of elves: ${caloriesPerElf.length}`);
console.log(
  `Total calories of elf with the most calories: ${Math.max(...caloriesPerElf)}`
);

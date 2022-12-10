import { readFileSync } from "fs";

export const day_1 = () => {
  const day_1 = "day-1.txt"; //  https://adventofcode.com/2022/day/1

  // Read file from disk
  const data = readFileSync(`./data/${day_1}`, "utf8");

  const arrayOfText = data.split("\n");

  const generateCaloriesPerElfArray = (arrayOfText) => {
    const result = [];
    let totalCaloriesOfCurrentElf = 0;
    arrayOfText.forEach((item) => {
      if (item !== "") {
        totalCaloriesOfCurrentElf = parseInt(item) + totalCaloriesOfCurrentElf;
      }
      if (item === "") {
        result.push(totalCaloriesOfCurrentElf);
        totalCaloriesOfCurrentElf = 0;
      }
    });
    return result;
  };

  const compareNumbers = (a, b) => {
    return b - a;
  };

  const sortCaloriesPerElfArray = (numberArray) => {
    return numberArray.sort(compareNumbers);
  };

  console.log("DAY ONE - Part One");

  const caloriesPerElfArray = generateCaloriesPerElfArray(arrayOfText);
  console.log(
    `Total calories of elf with the most calories: ${Math.max(
      ...caloriesPerElfArray
    )}\n`
  );

  console.log("DAY ONE - Part Two");
  const caloriesPerElfArraySorted =
    sortCaloriesPerElfArray(caloriesPerElfArray);
  const sumTopThreeCaloriesPerElf = (numberArray) => {
    let result = 0;
    result = numberArray[0] + numberArray[1] + numberArray[2];
    return result;
  };
  console.log(
    `Total calories of top three elves with the most calories: ${sumTopThreeCaloriesPerElf(
      caloriesPerElfArraySorted
    )}`
  );
};

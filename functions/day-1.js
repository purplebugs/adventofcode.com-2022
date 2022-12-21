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

  console.log("DAY ONE\n");

  const caloriesPerElfArray = generateCaloriesPerElfArray(arrayOfText);
  console.log(`1: ${Math.max(...caloriesPerElfArray)}`);

  const caloriesPerElfArraySorted =
    sortCaloriesPerElfArray(caloriesPerElfArray);
  const sumTopThreeCaloriesPerElf = (numberArray) => {
    let result = 0;
    result = numberArray[0] + numberArray[1] + numberArray[2];
    return result;
  };
  console.log(`2: ${sumTopThreeCaloriesPerElf(caloriesPerElfArraySorted)}\n\n`);
};

import { readFileSync } from "fs";

export const day_5 = () => {
  const day_5 = "day-5.txt"; //  https://adventofcode.com/2022/day/5

  // Read file from disk
  const data = readFileSync(`./data/${day_5}`, "utf8");
  const crates = data.split("\n").splice(0, 8);
  let cargo = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  };
  crates.forEach((line) => {
    let rows = [];
    const one = line.substring(1, 2);
    const two = line.substring(5, 6);
    const three = line.substring(9, 10);
    const four = line.substring(13, 14);
    const five = line.substring(17, 18);
    const six = line.substring(21, 22);
    const seven = line.substring(25, 26);
    const eight = line.substring(29, 30);
    const nine = line.substring(33, 34);
    rows.push(one, two, three, four, five, six, seven, eight, nine);
    cargo[1].unshift(one);
    cargo[2].unshift(two);
    cargo[3].unshift(three);
    cargo[4].unshift(four);
    cargo[5].unshift(five);
    cargo[6].unshift(six);
    cargo[7].unshift(seven);
    cargo[8].unshift(eight);
    cargo[9].unshift(nine);
  });

  console.log("DAY FIVE - Part One");

  console.log(`TODO \n${JSON.stringify(cargo)}\n`);

  console.log("DAY FIVE - Part Two");
  console.log(`TODO\n\n`);
};

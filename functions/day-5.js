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

    if (one !== " ") {
      cargo[1].unshift(one);
    }
    if (two !== " ") {
      cargo[2].unshift(two);
    }
    if (three !== " ") {
      cargo[3].unshift(three);
    }
    if (four !== " ") {
      cargo[4].unshift(four);
    }
    if (five !== " ") {
      cargo[5].unshift(five);
    }
    if (six !== " ") {
      cargo[6].unshift(six);
    }
    if (seven !== " ") {
      cargo[7].unshift(seven);
    }
    if (eight !== " ") {
      cargo[8].unshift(eight);
    }
    if (nine !== " ") {
      cargo[9].unshift(nine);
    }
  });

  let instructions = {};
  instructions = data
    .split("\n")
    .splice(10, 512)
    .map((line) => {
      return {
        move: +line.substring(5, 6),
        from: +line.substring(12, 13),
        to: +line.substring(17, 18),
      };
    });

  const moveCargo = (move, from, to) => {
    const temp = cargo[from].slice(-move).reverse();
    cargo[from].splice(-move, move);
    cargo[to].push(...temp);
  };

  // instructions.forEach((instruction, i) => {
  //   console.log(`${JSON.stringify(instruction)} - ${i}`);
  //   console.log(instruction.move);
  //   moveCargo(instruction.move, instruction.from, instruction.to);
  // });

  // console.log(`${JSON.stringify(cargo)}\n`);
  // moveCargo(1, 5, 2);
  // console.log(`${JSON.stringify(cargo)}\n`);
  // moveCargo(7, 7, 1);

  console.log("DAY FIVE - Part One");
  console.log(`TODO - ${JSON.stringify(cargo)}\n`);
  console.log("DAY FIVE - Part Two");
  console.log(`TODO\n\n`);
};

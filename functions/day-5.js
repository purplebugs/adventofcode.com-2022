import { readFileSync } from "fs";

export const day_5 = () => {
  const day_5 = "day-5.txt"; //  https://adventofcode.com/2022/day/5

  // Read file from disk
  const data = readFileSync(`./data/${day_5}`, "utf8");
  const crates = data.split("\n").splice(0, 8);

  // PART ONE
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
      const parts = line.split(" ");

      return {
        move: +parts[1],
        from: +parts[3],
        to: +parts[5],
      };
    });

  const moveCargo = (move, from, to, isPartOne) => {
    let temp = null;
    if (isPartOne) {
      temp = cargo[from].slice(-move).reverse();
    }
    if (!isPartOne) {
      temp = cargo[from].slice(-move);
    }
    cargo[from].splice(-move, move);
    cargo[to].push(...temp);
  };

  let topsPartOne = [];
  instructions.forEach((instruction, isPartOne = true) => {
    moveCargo(instruction.move, instruction.from, instruction.to, isPartOne);
  });

  for (let i = 1; i <= 9; i++) {
    topsPartOne.push(cargo[i][cargo[i].length - 1]);
  }

  // PART TWO - re initialise cargo since functions modify arrays in place
  // and we don't want PART TWO to start with the configuration of cargo from PART ONE
  cargo = {
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

  let topsPartTwo = [];
  instructions.forEach((instruction) => {
    moveCargo(instruction.move, instruction.from, instruction.to, false);
  });

  for (let i = 1; i <= 9; i++) {
    topsPartTwo.push(cargo[i][cargo[i].length - 1]);
  }
  //console.log(`${JSON.stringify(cargo)}\n`);

  console.log("DAY FIVE - Part One");
  console.log(`Crates on top of each stack: ${topsPartOne.join("")}\n`);
  console.log("DAY FIVE - Part Two");
  console.log(`Crates on top of each stack: ${topsPartTwo.join("")}\n\n`);
};

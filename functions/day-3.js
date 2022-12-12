import { readFileSync } from "fs";

export const day_3 = () => {
  const day_3 = "day-3.txt"; //  https://adventofcode.com/2022/day/3

  // Read file from disk
  const data = readFileSync(`./data/${day_3}`, "utf8");

  const priority = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    A: 27,
    B: 28,
    C: 29,
    D: 30,
    E: 31,
    F: 32,
    G: 33,
    H: 34,
    I: 35,
    J: 36,
    K: 37,
    L: 38,
    M: 39,
    N: 40,
    O: 41,
    P: 42,
    Q: 43,
    R: 44,
    S: 45,
    T: 46,
    U: 47,
    V: 48,
    W: 49,
    X: 50,
    Y: 51,
    Z: 52,
  };

  const rugsacks = data.split("\n").map((rugsack) => {
    const length = rugsack.length;
    let splitRugsack = {
      first: rugsack.slice(0, length / 2),
      second: rugsack.slice(length / 2, length),
    };

    const regex = RegExp(`[${splitRugsack.second}]`, "g");
    const duplicate = splitRugsack.first[splitRugsack.first.search(regex)]; // splitRugsack.first.search(regex) is index
    splitRugsack = {
      ...splitRugsack,
      duplicate: duplicate,
      priority: priority[duplicate],
    };

    return splitRugsack;
  });

  console.log("DAY THREE  - Part One");

  console.log(
    `Sum of rugsack rugsackPriorities: ${JSON.stringify(
      rugsacks
        .map((rugsack) => rugsack.priority)
        .reduce((accumulator, currentValue) => accumulator + currentValue)
    )}\n`
  );

  console.log("DAY THREE  - Part Two");
  //console.log(`TODO \n`);
};

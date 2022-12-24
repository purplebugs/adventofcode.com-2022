import { readFileSync } from "fs";

class Point {
  constructor(x = 0, y = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.viewingDistanceRight = 0;
    this.viewingDistanceLeft = 0;
    this.viewingDistanceAbove = 0;
    this.viewingDistanceBelow = 0;
    this.scenicScore = 0;
  }

  // toJSON() {
  //   return this.height;
  // }
}

class Matrix {
  constructor(matrix = []) {
    this.matrix = matrix;
  }

  create(data = "") {
    const numberLines = data.split("\n");

    // Put array in array to make 2D array
    let x = 0;
    let y = 0;
    this.matrix = numberLines.map((line) => {
      const toInt = line.split("");
      const toArrayOfInt = [];

      toInt.forEach((char) => {
        const item = new Point(x, y, +char);
        toArrayOfInt.push(item);
        x++;
      });
      y++;
      x = 0;
      return toArrayOfInt;
    });
  }

  isVisibleOnRight(point) {
    const row = this.matrix[point.y].slice(point.x + 1);
    const isHidden = row.findIndex(
      (neighbour) => neighbour.height >= point.height
    );
    point.viewingDistanceRight = isHidden !== -1 ? isHidden + 1 : row.length;
    return isHidden === -1;
  }

  isVisibleOnLeft(point) {
    const row = this.matrix[point.y].slice(0, point.x);
    row.reverse();
    const isHidden = row.findIndex(
      (neighbour) => neighbour.height >= point.height
    );
    point.viewingDistanceLeft = isHidden !== -1 ? isHidden + 1 : row.length;
    return isHidden === -1;
  }

  isVisibleAbove(point) {
    let column = this.matrix.map((row) => {
      return row[point.x];
    });

    column = column.slice(0, point.y);
    column.reverse();
    const isHidden = column.findIndex(
      (neighbour) => neighbour.height >= point.height
    );
    point.viewingDistanceAbove = isHidden !== -1 ? isHidden + 1 : column.length;
    return isHidden === -1;
  }

  isVisibleBelow(point) {
    let column = this.matrix.map((row) => {
      return row[point.x];
    });

    column = column.slice(point.y + 1);

    const isHidden = column.findIndex(
      (neighbour) => neighbour.height >= point.height
    );

    point.viewingDistanceBelow = isHidden !== -1 ? isHidden + 1 : column.length;
    return isHidden === -1;
  }

  isVisible(point) {
    const right = this.isVisibleOnRight(point);
    const left = this.isVisibleOnLeft(point);
    const above = this.isVisibleAbove(point);
    const below = this.isVisibleBelow(point);

    return right || left || above || below;
  }

  process() {
    const visibleTrees = [];

    this.matrix.forEach((row) => {
      row.forEach((point) => {
        if (this.isVisible(point)) {
          visibleTrees.push(point);
        }
      });
    });

    return { countVisible: visibleTrees.length };
  }

  processView() {
    let maxView = 0;
    let mostScenicPoint = this.matrix[0][0];

    this.matrix.forEach((row) => {
      row.forEach((point) => {
        point.scenicScore =
          point.viewingDistanceRight *
          point.viewingDistanceLeft *
          point.viewingDistanceAbove *
          point.viewingDistanceBelow;

        if (point.scenicScore > maxView) {
          mostScenicPoint = point;
          maxView = point.scenicScore;
        }
      });
    });
    return mostScenicPoint;
  }
}

export const day_8 = () => {
  // const day_8 = "day-8-example.txt"; //  https://adventofcode.com/2022/day/8
  const day_8 = "day-8.txt"; //  https://adventofcode.com/2022/day/8

  const data = readFileSync(`./data/${day_8}`, "utf8");
  const matrix = new Matrix();
  matrix.create(data);

  console.log("DAY EIGHT\n");

  console.log(`1: ${matrix.process().countVisible}`);
  console.log(`processView: ${JSON.stringify(matrix.processView())}`);
  // console.log(JSON.stringify(matrix, null, 2));

  console.log(
    `${matrix.isVisibleOnRight({
      x: 2,
      y: 3,
      height: 5,
    })}`
  );
};

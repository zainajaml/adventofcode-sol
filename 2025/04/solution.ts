import { dir } from "console";
import fs from "fs/promises";

async function readFileContent(filePath: string): Promise<string[]> {
  const rawData = await fs.readFile(filePath, "utf-8");
  return rawData.split("\n");
}
function splitString(pattern: string): string[] {
  return pattern.split("");
}
//my logic
function checkAdjacent(grid: string[][], x: number, y: number): boolean {
  let row = grid.length - 1;
  let col = grid[0]!.length - 1;
  // console.log(row, col);
  let cellValue = 0;
  // left
  console.log("-------------------");
  if (grid[y]![x] === "@") {
    if (x - 1 >= 0) {
      if (grid[y]![x - 1] === "@") {
        console.log("left");
        cellValue += 1;
      }
    } // right
    if (x + 1 <= col) {
      if (grid[y]![x + 1] === "@") {
        console.log("right");
        cellValue += 1;
      }
    } // up
    if (y - 1 >= 0) {
      if (grid[y - 1]![x] === "@") {
        console.log("up");
        cellValue += 1;
      }
    } // down
    if (y + 1 <= row) {
      if (grid[y + 1]![x] === "@") {
        console.log("down");
        cellValue += 1;
      }
    } //lower diagnol
    if (x + 1 <= col && y + 1 <= row) {
      if (grid[y + 1]![x + 1] === "@") {
        console.log("lower right");
        cellValue += 1;
      }
    }
    if (y + 1 <= row && x - 1 >= 0) {
      if (grid[y + 1]![x - 1] === "@") {
        console.log("lower left");
        cellValue += 1;
      }
    }
    //upper diagnol
    if (x + 1 <= col && y - 1 >= 0) {
      if (grid[y - 1]![x + 1] === "@") {
        console.log("upper right");
        cellValue += 1;
      }
    }
    if (y - 1 >= 0 && x - 1 >= 0) {
      if (grid[y - 1]![x - 1] === "@") {
        console.log("upper left");
        cellValue += 1;
      }
    }
    console.log(
      `Cell (${y}, ${x}) has ${cellValue} adjacent cell value ${grid[y]![x]}`
    );
  }
  if (cellValue < 4 && grid[y]![x] === "@") {
    console.log(`Cell (${y}, ${x}) is valid`);
    return true;
  } else {
    return false;
  }
}
//gpt optimized
function checkAdjacentGPT(grid: string[][], x: number, y: number): boolean {
  if (grid[y]?.[x] !== "@") return false;

  const rows = grid.length;
  const cols = grid[0]!.length;

  const directions = [
    [-1, 0], // left
    [1, 0], // right
    [0, -1], // up
    [0, 1], // down
    [-1, -1], // upper-left
    [1, -1], // upper-right
    [-1, 1], // lower-left
    [1, 1], // lower-right
  ];

  let count = 0;

  for (const [dx, dy] of directions) {
    const nx = x + dx!;
    const ny = y + dy!;

    if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && grid[ny]![nx] === "@") {
      count++;
    }
  }

  return count < 4;
}
function removeAdjacent(
  grid: string[][],
  x: number,
  y: number
): { grid: string[][]; count: boolean } {
  let row = grid.length - 1;
  let col = grid[0]!.length - 1;
  let cellValue = 0;
  // left
  if (grid[y]![x] === "@") {
    if (x - 1 >= 0) {
      if (grid[y]![x - 1] === "@") {
        console.log("left");
        cellValue += 1;
      }
    } // right
    if (x + 1 <= col) {
      if (grid[y]![x + 1] === "@") {
        console.log("right");
        cellValue += 1;
      }
    } // up
    if (y - 1 >= 0) {
      if (grid[y - 1]![x] === "@") {
        console.log("up");
        cellValue += 1;
      }
    } // down
    if (y + 1 <= row) {
      if (grid[y + 1]![x] === "@") {
        console.log("down");
        cellValue += 1;
      }
    } //lower diagnol
    if (x + 1 <= col && y + 1 <= row) {
      if (grid[y + 1]![x + 1] === "@") {
        console.log("lower right");
        cellValue += 1;
      }
    }
    if (y + 1 <= row && x - 1 >= 0) {
      if (grid[y + 1]![x - 1] === "@") {
        console.log("lower left");
        cellValue += 1;
      }
    }
    //upper diagnol
    if (x + 1 <= col && y - 1 >= 0) {
      if (grid[y - 1]![x + 1] === "@") {
        console.log("upper right");
        cellValue += 1;
      }
    }
    if (y - 1 >= 0 && x - 1 >= 0) {
      if (grid[y - 1]![x - 1] === "@") {
        console.log("upper left");
        cellValue += 1;
      }
    }
    console.log(
      `Cell (${y}, ${x}) has ${cellValue} adjacent cell value ${grid[y]![x]}`
    );
  }
  if (cellValue < 4 && grid[y]![x] === "@") {
    console.log(`Cell (${y}, ${x}) is valid`);
    grid[y]![x] = ".";
    return { grid, count: true };
  }
  return { grid, count: false };
}
function removeAdjacentgpt(
  grid: string[][],
  x: number,
  y: number
): { grid: string[][]; count: boolean } {
  if (grid[y]?.[x] !== "@") {
    return { grid, count: false };
  }

  const rows = grid.length;
  const cols = grid[0]!.length;

  const directions = [
    [-1,  0], // left
    [ 1,  0], // right
    [ 0, -1], // up
    [ 0,  1], // down
    [-1, -1], // upper-left
    [ 1, -1], // upper-right
    [-1,  1], // lower-left
    [ 1,  1], // lower-right
  ];

  let adjacentCount = 0;

  for (const [dx, dy] of directions) {
    const nx = x + dx!;
    const ny = y + dy!;

    if (
      ny >= 0 && ny < rows &&
      nx >= 0 && nx < cols &&
      grid[ny]![nx] === "@"
    ) {
      adjacentCount++;

      // 🚀 early exit optimization
      if (adjacentCount >= 4) {
        return { grid, count: false };
      }
    }
  }

  // valid cell → remove it
  grid[y][x] = ".";
  return { grid, count: true };
}


function convertToGrid(rawData: string[]): string[][] {
  const row = rawData.length;
  const col = splitString(rawData[0]!).length;
  console.log(col, row);
  let grid: string[][] = [];
  for (let i = 0; i < row; i++) {
    const chars = splitString(rawData[i]!);
    grid[i] = [];
    for (let j = 0; j < col; j++) {
      grid[i]![j] = chars[j]!;
    }
  }
  console.log(grid);
  return grid;
}

function stepOne(rawData: string[]): number {
  console.log(rawData);

  console.log("-------------------");
  const data = convertToGrid(rawData);
  let password = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0]!.length; x++) {
      if (checkAdjacentGPT(data, x, y)) {
        password += 1;
      }
    }
    console.log("@ count after row", y, "is", password);
  }
  return password;
}

function stepTwo(rawData: string[]): number {
  console.log(rawData);

  console.log("-------------------");
  const data = convertToGrid(rawData);
  let password = 0;
  let hasMore = true;
  while (hasMore) {
    let countThisRound = 0;
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[0]!.length; x++) {
        const newgrid = removeAdjacentgpt(data, x, y);
        if (newgrid.count) {
          countThisRound += 1;
        }
      }
      console.log("@ count after row", y, "is", countThisRound);
    }
    password += countThisRound;
    if (countThisRound === 0) {
      hasMore = false;
    }
  }
  return password;
}

const input = await readFileContent("./input.txt");
// const result = stepOne(input);
const result = stepTwo(input);
console.log("Result:", result);

import { dir } from "console";
import fs from "fs/promises";

async function readFileContent(filePath: string): Promise<string[]> {
  const rawData = await fs.readFile(filePath, "utf-8");
  return rawData.split("\n");
}

function parseLine(line: string[]): { ranges: number[][]; inputs: number[] } {
  let Inputs: number[] = [];
  let ranges: number[][] = [];
  let isInputsComes = false;
  line.forEach((element) => {
    if (element === "") {
      isInputsComes = true;
      return;
    }
    if (!isInputsComes) {
      const [start, end] = element.split("-").map(Number);
      ranges.push([start!, end!]);
    } else {
      Inputs.push(Number(element));
    }
  });
  return { ranges: ranges, inputs: Inputs };
}

function stepOne(Id: string[]): number {
  let password: number[] = [];
  const { ranges, inputs } = parseLine(Id);
  console.log("ranges:", ranges);
  console.log("inputs:", inputs);
  for (let i = 0; i < inputs.length; i++) {
    let isSpoiled = true;
    for (let j = 0; j < ranges.length; j++) {
      const start = ranges[j]![0];
      const end = ranges[j]![1];
      if (inputs[i]! >= start! && inputs[i]! <= end!) {
        isSpoiled = false;
        break;
      }
    }
    if (!isSpoiled) {
      password.push(inputs[i]!);
    }
  }
  console.log("fresh foods", password);
  return password.length;
}

function stepTwo(Id: string[]): number {
  let password: number[] = [];
  const { ranges, inputs } = parseLine(Id);
  console.log("ranges:", ranges);
  for (let i = 0; i < ranges.length; i++) {
    let isSpoiled = true;
    const start = ranges[i]![0];
    const end = ranges[i]![1];
    for (let j = start; j! <= end!; j!++) {
      if (!password.includes(j!)) {
        password.push(j!);
      }
    }
  }

  console.log("fresh foods", password);
  return password.length;
  //gpt version
  // const { ranges } = parseLine(Id);

  // const unique = new Set<number>();

  // for (const [start, end] of ranges) {
  //   for (let v = start; v! <= end!; v!++) {
  //     unique.add(v!);
  //   }
  // }

  // console.log("fresh foods", [...unique]);
  // return unique.size;
}

function stepTwoOptimized(Id: string[]): number {
  const { ranges } = parseLine(Id);

  // Sort ranges by start
  ranges.sort((a, b) => a[0]! - b[0]!);

  let total = 0;
  let [currentStart, currentEnd] = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];

    if (start <= currentEnd + 1) {
      // Merge overlapping or adjacent ranges
      currentEnd = Math.max(currentEnd, end);
    } else {
      // Add finished range length
      total += currentEnd - currentStart + 1;
      currentStart = start;
      currentEnd = end;
    }
  }

  // Add last range
  total += currentEnd - currentStart + 1;

  return total;
}

const input = await readFileContent("./input.txt");
// const result = stepOne(input);
const result = stepTwoOptimized(input);
console.log("Result:", result);

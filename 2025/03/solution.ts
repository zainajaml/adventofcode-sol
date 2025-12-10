import { dir } from "console";
import fs from "fs/promises";

async function readFileContent(filePath: string): Promise<string[]> {
  const rawData = await fs.readFile(filePath, "utf-8");
  return rawData.split("\n");
}

function isInvalidId(id: number): boolean {
  let idStr = id.toString();
  const firsthalf = idStr.slice(0, Math.floor(idStr.length / 2));
  const secondhalf = idStr.slice(Math.floor(idStr.length / 2));
  return firsthalf === secondhalf;
}

function checkwithRegex(id: number): boolean {
  const idStr = id.toString();
  const regex = /^(\d+)\1+$/;
  return regex.test(idStr);
}

function stepOne(Id: string[]): number {
  console.log(Id);
  let password: number[] = [];
  Id.forEach((element) => {
    const serial = element.split("");
    let largest = 0;
    let secondLargest = 0;
    let largestIndex = 0;
    let secondLargestIndex = 0;
    for (let i = 0; i < serial.length; i++) {
      if (Number(serial[i]) > largest && i !== serial.length - 1) {
        largest = Number(serial[i]);
        largestIndex = i;
      }
    }
    for (let j = largestIndex+1; j < serial.length; j++) {
      if (Number(serial[j]) > secondLargest) {
        secondLargest = Number(serial[j]);
        secondLargestIndex = j;
      }
    }
    password.push(Number(largest.toString() + secondLargest.toString()));
  });
  console.log(password);
  return password.reduce((a, b) => a + b);
}

function stepTwo(Id: string[]): number {
  let password: number[] = [];
  Id.forEach((element) => {
    const [start, end] = element.split("-").map(Number);
    console.log(start, end);
    for (let i = start!; i <= end!; i++) {
      if (checkwithRegex(i)) password.push(i);
    }
  });
  console.log(password);
  return password.reduce((a, b) => a + b);
}

const input = await readFileContent("./input.txt");
const result = stepOne(input);
// const result = stepTwo(input);
console.log("Result:", result);

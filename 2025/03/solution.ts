import { dir } from "console";
import fs from "fs/promises";

async function readFileContent(filePath: string): Promise<string[]> {
  const rawData = await fs.readFile(filePath, "utf-8");
  return rawData.split("\n");
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
    for (let j = largestIndex + 1; j < serial.length; j++) {
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
  console.log(Id);
  Id.forEach((element) => {
    const serial = element.split("");
    const digits: number[] = [];
    let currentMaxIndex= 0;
    for (let need = 11; need >= 0 ; need--) {
      for (let i = currentMaxIndex; i < serial.length - need; i++) {
        if (Number(serial[i]) > Number(serial[currentMaxIndex])   ) {
          currentMaxIndex = i;
        }
      }
      digits.push(Number(serial[currentMaxIndex]));
      currentMaxIndex = currentMaxIndex + 1;
    }
    password.push(Number(digits.join("")));
  });

  console.log(password);
  return password.reduce((a, b) => a + b);
}

const input = await readFileContent("./input.txt");
// const result = stepOne(input);
const result = stepTwo(input);
console.log("Result:", result);

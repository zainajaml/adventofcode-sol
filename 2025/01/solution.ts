import { dir } from "console";
import fs from "fs/promises";

async function readFileContent(filePath: string): Promise<string[]> {
  const rawData = await fs.readFile(filePath, "utf-8");
  return rawData.split("\n");
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function divmod(value: number, divisor: number): number {
  
  return value - (divisor * Math.floor(value / divisor));
}

function stepOne(rotations: string[]): number {
  let password = 0;
  let current = 50;
  let max = 100;
  rotations.forEach((rotation) => {
    let value = rotation.replace("L", "-").replace("R", "");
    console.log(`Current dial position: ${current}`);
    current = (((current + parseInt(value)) % max) + max) % max;
    console.log(`Rotating dial with ${rotation} to point at ${current}`);
    if (current == 0) password++;
  });

  return password;
}

function stepTwo(rotations: string[]): number {
  let password = 0;
  let current = 50;
  let max = 100;
  let wheel = Array.from({ length: max }, (_, i) => i);

  rotations.forEach((rotation) => {
    let direction = rotation.slice(0, 1);
    let value = Number(rotation.slice(1));
    console.log(`Rotation from ${rotation} Current ${current}`);
    if (direction === "L") {
      value *= -1
      let divison = Math.floor(value / (max * -1));
      let mod = divmod(value, (max * -1));
      console.log(`Value: ${value} Divison: ${divison} Mod: ${mod}`);
      password += divison;
      if (current !== 0 && current + mod <= 0) {
        console.log("passing from zero");
        password += 1;
      }
    }
    if (direction === "R") {
      let divison = Math.floor(value / max);
      let mod = divmod(value, (max));
      password += divison;
      if (current + mod >= max) {
        console.log("passing from max");
       password += 1;
      }
    }
    current = divmod(current+value, max);
  });

  return password;
}

const input = await readFileContent("./sample.txt");
// const result = stepOne(input);
const result = stepTwo(input);
console.log("Result:", result);

import fs from "fs/promises";

async function readFileContent(filePath: string): Promise<string[]> {
  const rawData = await fs.readFile(filePath, "utf-8");
  return rawData.split("\n");
}

function stepOne(rotations: string[]): number {
  let password = 0;
  let current = 50;
  let max = 100;
  rotations.forEach((rotation)=> {
    let distance = rotation.replace('L','-').replace('R','');
    current = (current + parseInt(distance)) % max;
    if(current ==0) password++;
  })
  
  return password;
}

const input =await readFileContent("./input.txt");
const result = stepOne(input);
console.log("Result:", result);

import { alphabet, charHeight } from "./letters.ts";

export function renderString(input: string): void {
  const rows = initializeRows();
  const pixelArray = preRender(input, rows);
  console.info("column count: ", pixelArray[0].length);
  renderArrayToConsole(pixelArray);
  renderArrayToGitHistory(pixelArray);
}

export function initializeRows(): number[][] {
  return Array(charHeight).fill([]);
}

export function preRender(input: string, rows: number[][]): number[][] {
  for (const char of input) {
    rows = processChar(char, rows);
  }
  return rows;
}

function processChar(char: string, rows: number[][]) {
  const charArray = alphabet[char];
  if (charArray) {
    return appendChar(charArray, rows);
  } else {
    return appendEmptyChar(rows);
  }
}

function appendChar(charArray: number[][], rows: number[][]) {
  return appendToCols(rows, charArray);
}

function appendEmptyChar(rows: number[][]) {
  return appendToCols(rows, Array(rows.length).fill(Array(1).fill(0)));
}

export function appendToCols(
  rows: number[][],
  dataToAppend: number[][],
): number[][] {
  // this includes a blank vertical column to separate the characters
  return rows.map((row, index) => [...row, ...dataToAppend[index], 0]);
}

export function renderArrayToConsole(rows: number[][]): void {
  for (const row of rows) {
    renderRow(row);
  }
}

function renderRow(row: number[]): void {
  let renderedRow = "";
  for (const charPixel of row) {
    renderedRow += renderPixel(charPixel);
  }
  console.log(renderedRow);
}

function renderPixel(pixel: number): string {
  return pixel === 1 ? "█" : " ";
}

export function renderArrayToGitHistory(rows: number[][]): void {
  // for now, hardcode a suitable start date that is mostly clear in my existing history
  const date = new Date("2023-09-03");
  const outputFilename = `git-history-write.sh`;
  Deno.writeTextFileSync(outputFilename, `#!/bin/bash\n`);
  // column-first loop through the pre-rendered array - this models the order
  // the days are rendered in the git history chart on the user profile page
  for (let col = 0; col < rows[0].length; col++) {
    for (let row = 0; row < rows.length; row++) {
      const pixel = rows[row][col];
      console.debug(
        `found a pixel value of ${pixel} at row ${row} and column ${col}`,
      );
      parsePixel(pixel, outputFilename, date);
      date.setDate(date.getDate() + 1);
    }
  }
}

function parsePixel(pixel: number, outputFilename: string, date: Date): void {
  if (pixel === 1) {
    writeCommitsForDay(outputFilename, date);
  } else {
    // skip writing commits on days where there is no pixel present
  }
}

function writeCommitsForDay(outputFilename: string, date: Date) {
  const formattedDate = date.toISOString().split("T")[0];
  // write four commits each day for maximum brightness
  // this is based on GitHub's parsing of the commit context which does
  // not feature more than four commits for me in a given day
  // this can be scaled up as needed when I have more public commit history
  const commitTotal = 4;
  for (let i = 0; i < commitTotal; i++) {
    const commitMessage = `commit for ${formattedDate} (${i + 1} of ${commitTotal})`;
    const gitCommand =
      `git commit --allow-empty -m "${commitMessage}" --date="${formattedDate}"`;
    Deno.writeTextFileSync(outputFilename, gitCommand + "\n", {
      append: true,
    });
  }
}

// Example usage:
renderString("Hello world!");

import { alphabet, charHeight, charWidth } from "./letters.ts";

// TODO: write automated tests to ensure character data works with
// expectations elsewhere in the code e.g. in the preRender function

export function renderString(input: string): void {
  const rows = initializeRows();
  const pixelArray = preRender(input, rows);
  renderArrayToConsole(pixelArray);
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
  return appendToCols(rows, Array(rows.length).fill(Array(charWidth).fill(0)));
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

// Example usage:
renderString("Hello world!");

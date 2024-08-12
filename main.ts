import { alphabet, charHeight, charWidth } from "./letters.ts";

// TODO: write automated tests to ensure character data works with
// expectations elsewhere in the code e.g. in the preRender function

export function renderString(input: string): void {
  const rows = initializeRows();
  const pixelArray = preRender(input, rows);
  renderArrayToConsole(pixelArray);
}

export function initializeRows(): number[][][] {
  return Array(charHeight).fill([]).map(() => []);
}

export function preRender(input: string, rows: number[][][]): number[][][] {
  for (const char of input) {
    processChar(char, rows);
  }
  return rows;
}

function processChar(char: string, rows: number[][][]): void {
  const charArray = alphabet[char];
  if (charArray) {
    appendCharToRows(charArray, rows);
  } else {
    appendEmptyCharToRows(rows);
  }
}

function appendCharToRows(charArray: number[][], rows: number[][][]) {
  appendToRows(rows, charArray);
}

function appendEmptyCharToRows(rows: number[][][]) {
  appendToRows(rows, Array(rows.length).fill(Array(charWidth).fill(0)));
}

export function appendToRows(rows: number[][][], rowData: number[][]) {
  for (let i = 0; i < rows.length; i++) {
    rows[i].push(rowData[i]);
  }
}

export function renderArrayToConsole(rows: number[][][]): void {
  for (const row of rows) {
    renderRow(row);
  }
}

function renderRow(row: number[][]): void {
  let renderedRow = "";
  for (const charPixels of row) {
    renderedRow += charPixels.map(renderPixel).join("") + " ";
  }
  console.log(renderedRow);
}

function renderPixel(pixel: number): string {
  return pixel === 1 ? "█" : " ";
}

// Example usage:
renderString("Hello world!");

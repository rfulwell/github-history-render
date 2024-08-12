import { alphabet, charHeight, charWidth } from "./letters.ts";

// TODO: write automated tests to ensure character data works with
// expectations elsewhere in the code e.g. in the preRender function

function preRender(input: string): number[][][] {
  const rows: number[][][] = Array(charHeight).fill([]).map(() => []);

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

function appendToRows(rows: number[][][], rowData: number[][]) {
  for (let i = 0; i < rows.length; i++) {
    rows[i].push(rowData[i]);
  }
}

function appendCharToRows(charArray: number[][], rows: number[][][]) {
  appendToRows(rows, charArray);
}

function appendEmptyCharToRows(rows: number[][][]) {
  appendToRows(rows, Array(rows.length).fill(Array(charWidth).fill(0)));
}

function renderPixel(pixel: number): string {
  return pixel === 1 ? "█" : " ";
}

function renderArrayToConsole(rows: number[][][]): void {
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

function renderStringHorizontally(input: string): void {
  const pixelArray = preRender(input);
  renderArrayToConsole(pixelArray);
}

// Example usage:
renderStringHorizontally("Hello world!");

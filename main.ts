import { alphabet, charHeight, charWidth } from "./letters.ts";

function preRender(input: string): number[][][] {
  const rows: number[][][] = Array(charHeight).fill([]).map(() => []);

  for (const char of input) {
    const charArray = alphabet[char];
    if (charArray) {
      for (let i = 0; i < charArray.length; i++) {
        rows[i].push(charArray[i]);
      }
    } else {
      for (let i = 0; i < rows.length; i++) {
        rows[i].push(Array(charWidth).fill(0));
      }
    }
  }

  return rows;
}

function renderPixel(pixel: number): string {
  return pixel === 1 ? "█" : " ";
}

function renderArrayToConsole(rows: number[][][]): void {
  for (const row of rows) {
    let renderedRow = "";
    for (const charPixels of row) {
      renderedRow += charPixels.map(renderPixel).join("") + " ";
    }
    console.log(renderedRow);
  }
}

function renderStringHorizontally(input: string): void {
  const pixelArray = preRender(input);
  renderArrayToConsole(pixelArray);
}

// Example usage:
renderStringHorizontally("Hello world");
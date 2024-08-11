import { alphabet, charHeight, charWidth } from "./letters.ts";

function preRender(input: string): string[] {
  const rows: string[] = Array(charHeight).fill("");

  for (const char of input) {
    const charArray = alphabet[char];
    if (charArray) {
      for (let i = 0; i < charArray.length; i++) {
        rows[i] +=
          charArray[i].map((pixel) => renderPixel(pixel)).join("") + " ";
      }
    } else {
      for (let i = 0; i < rows.length; i++) {
        rows[i] += " ".repeat(charWidth);
      }
    }
  }

  return rows;
}

function renderPixel(pixel: number): string {
  return pixel === 1 ? "█" : " ";
}

function renderArrayToConsole(rows: string[]): void {
  for (const row of rows) {
    console.log(row);
  }
}

function renderStringHorizontally(input: string): void {
  const stringArray = preRender(input);
  renderArrayToConsole(stringArray);
}

// Example usage:
renderStringHorizontally("Hello world");

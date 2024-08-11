import { alphabet, charHeight, charWidth } from "./letters.ts";

function renderStringHorizontally(input: string): void {
  const rows: string[] = Array(charHeight).fill("");

  for (const char of input) {
    const charArray = alphabet[char];
    if (charArray) {
      for (let i = 0; i < charArray.length; i++) {
        rows[i] +=
          charArray[i].map((pixel) => (pixel === 1 ? "█" : " ")).join("") + " "; // Add space between characters
      }
    } else {
      // Handle undefined characters (e.g., space) with empty spaces
      for (let i = 0; i < rows.length; i++) {
        rows[i] += " ".repeat(charWidth);
      }
    }
  }

  for (const row of rows) {
    console.log(row);
  }
}

// Example usage:
renderStringHorizontally("Hello world");

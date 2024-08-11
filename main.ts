// import letters_part1.ts into this file scope
import { alphabet } from "./letters.ts";

type CharacterArray = number[][];

// Function to render a character
function renderCharacter(char: string) {
    const charArray = alphabet[char];
    if (!charArray) {
        console.log(`Character ${char} not found in the alphabet array.`);
        return;
    }

    charArray.forEach(row => {
        console.log(row.map(pixel => (pixel === 1 ? '█' : ' ')).join(''));
    });
}
function renderStringHorizontally(input: string): void {
    const rows: string[] = Array(7).fill(""); // Assuming each character array has 7 rows

    for (const char of input) {
        const charArray = alphabet[char];
        if (charArray) {
            for (let i = 0; i < charArray.length; i++) {
                rows[i] += charArray[i].map(pixel => (pixel === 1 ? '█' : ' ')).join('') + ' '; // Add space between characters
            }
        } else {
            // Handle undefined characters (e.g., space) with empty spaces
            for (let i = 0; i < rows.length; i++) {
                rows[i] += "      "; // Adding an empty 6-column space for undefined characters
            }
        }
    }

    for (const row of rows) {
        console.log(row);
    }
}

// Example usage:
renderStringHorizontally("Hello world");
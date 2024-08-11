type CharacterArray = number[][];

const alphabet: { [key: string]: CharacterArray } = {
    A: [
        [0, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1],
    ],
    B: [
        [1, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 0, 0],
    ],
    // Add remaining letters here
};

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

// Example usage: render letters A and B
renderCharacter('A');
console.log('\n');
renderCharacter('B');
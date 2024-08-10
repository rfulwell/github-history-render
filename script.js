// Get references to DOM elements
const textInput = document.getElementById('textInput');
const canvas = document.getElementById('canvas');
const generateButton = document.getElementById('generateButton');
const ctx = canvas.getContext('2d');

// Set your desired canvas dimensions
const width = 200;
const height = 100;

canvas.width = width;
canvas.height = height;

// Event listener for the button
generateButton.addEventListener('click', function() {
    const text = textInput.value || '';
    generateGreyscaleImage(text);
});

function generateGreyscaleImage(text) {
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Set text properties
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw the text in the center of the canvas
    ctx.fillText(text, width / 2, height / 2);

    // Get the image data
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Convert the image to greyscale
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        // Calculate the greyscale value
        const grey = red * 0.3 + green * 0.59 + blue * 0.11;

        // Set the greyscale value to all RGB channels
        data[i] = grey;
        data[i + 1] = grey;
        data[i + 2] = grey;
    }

    // Put the modified data back on the canvas
    ctx.putImageData(imageData, 0, 0);
}

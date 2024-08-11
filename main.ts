import chalk from "npm:chalk@5";

export function add(a: number, b: number): number {
    return a + b;
}

export function renderTouch(num: number) {
    if (num === 0) {
        return chalk.black.bgBlack(' ');
    }
    if (num === 1) {
        return chalk.green.bgBlack('◩');
    }
    if (num === 2) {
        return chalk.greenBright.bgBlack('■');
    }
    if (num === 3) {
        return chalk.green.bgGreen('▦');
    }
    if (num === 4) {
        return chalk.greenBright.bgGreenBright(' ');
    }
}

if (import.meta.main) {
    console.log('render test strip:');
    console.log(renderTouch(0));
    console.log(renderTouch(1));
    console.log(renderTouch(2));
    console.log(renderTouch(3));
    console.log(renderTouch(4));

    console.log();
    console.log('render checkerboard');
    for (let i = 0; i < 8; i++) {
        let row = '';
        for (let j = 0; j < 8; j++) {
            row += renderTouch(i % 2 === j % 2 ? 4 : 0);
        }
        console.log(row);
    }

    console.log();
    console.log('render gradients');
    for (let y = 0; y < 7; y++) {
        let row = '';
        for (let x = 0; x < 53; x++) {
            row += renderTouch(x % 4);
        }
        console.log(row);
    }

    console.log();
    const letterA: number[][] = [
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1]
      ];
    for (let y = 0; y < 7; y++) {
        let row = '';
        for (let x = 0; x < 7; x++) {
            row += renderTouch(letterA[y][x]);
        }
        console.log(row);
    }
}

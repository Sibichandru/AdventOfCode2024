// //find XMAS in the 2d array vertically, diagonally,reverse and horizontall

const fs = require('fs');
const input = fs.readFileSync(
  __dirname + (process.argv.includes('--test') ? '/test.txt' : '/input.txt'),
  'utf8'
);
const parseInput = (rawInput) =>
  rawInput.split(/\r?\n/).map((row) => row.split(''));
const data = parseInput(input);
const rows = data.length;
const cols = data[0].length;
const directions = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
];
const checkWord = (x, y, dx, dy, grid, word) => {
  for (let i = 0; i < word.length; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;
    if (
      nx < 0 ||
      ny < 0 ||
      nx >= rows ||
      ny >= cols ||
      grid[ny][nx] !== word[i]
    ) {
      return false;
    }
  }
  return true;
};
// Part 1: Count all occurrences of "XMAS"
const part1 = (grid) => {
  let count = 0;
  const word = 'XMAS';
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      for (const [dx, dy] of directions) {
        if (checkWord(x, y, dx, dy, grid, word)) count++;
      }
    }
  }
  return count;
};
console.log(part1(data));

function part2(data) {
  let result = 0;
  const originalGrid = [];
  for (const line of data.split('\n')) {
    const row = [];
    for (const char of line) {
      row.push(char);
    }
    originalGrid.push(row);
  }
  const threeByThrees = [];
  for (let i = 0; i < originalGrid.length; i++) {
    if (originalGrid[i + 1] && originalGrid[i + 2]) {
      for (let j = 0; j < originalGrid[i].length; j++) {
        if (originalGrid[i][j + 1] && originalGrid[i][j + 2]) {
          const threeByThree = [
            [
              originalGrid[i][j],
              originalGrid[i][j + 1],
              originalGrid[i][j + 2],
            ],
            [
              originalGrid[i + 1][j],
              originalGrid[i + 1][j + 1],
              originalGrid[i + 1][j + 2],
            ],
            [
              originalGrid[i + 2][j],
              originalGrid[i + 2][j + 1],
              originalGrid[i + 2][j + 2],
            ],
          ];
          threeByThrees.push(threeByThree);
        }
      }
    }
  }
  const nines = [];
  for (const threeByThree of threeByThrees) {
    const nine = threeByThree.flat().join('');
    nines.push(nine);
  }
  for (const nine of nines) {
    let nA = nine.split(''); // nineArray
    nA = [nA[0], nA[2], nA[4], nA[6], nA[8]];
    if (
      nA[0] === 'M' &&
      nA[1] === 'S' &&
      nA[2] === 'A' &&
      nA[3] === 'M' &&
      nA[4] === 'S'
    ) {
      result++;
    } else if (
      nA[0] === 'M' &&
      nA[1] === 'M' &&
      nA[2] === 'A' &&
      nA[3] === 'S' &&
      nA[4] === 'S'
    ) {
      result++;
    } else if (
      nA[0] === 'S' &&
      nA[1] === 'S' &&
      nA[2] === 'A' &&
      nA[3] === 'M' &&
      nA[4] === 'M'
    ) {
      result++;
    } else if (
      nA[0] === 'S' &&
      nA[1] === 'M' &&
      nA[2] === 'A' &&
      nA[3] === 'S' &&
      nA[4] === 'M'
    ) {
      result++;
    }
  }
  return result;
}
console.log(part2(input));
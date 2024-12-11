const fs = require('fs');
const path = require('path');

const choice = 1;
const file = ['input.txt', 'input.txt'][choice];
const data = fs.readFileSync(path.join(__dirname, file), 'utf8');

const blocks = (() => {
  const res = [];
  for (let i = 0; i < data.length; i++) {
    res.push(...new Array(+data[i]).fill(i % 2 ? null : i / 2));
  }
  return res;
})();

let i = 0,
  j = blocks.length - 1;
while (true) {
  while (blocks[i] !== null) i++;
  while (blocks[j] === null) j--;
  if (i >= j) break;
  [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
}
console.log(
  blocks.filter((x) => x !== null).reduce((acc, x, i) => acc + x * i, 0)
);

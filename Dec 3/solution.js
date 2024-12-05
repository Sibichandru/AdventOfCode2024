const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const regex = /mul\(\d+,\d+\)/g;
const lines = input.match(regex);

let sum=0;
lines.forEach((line) => { 
  const [a, b] = line.match(/\d+/g);
  const result = a * b;
  sum += result;
});

const data = input.split('do()');
const a = data.map((track) => track.split("don't()")[0]);

const b = a
  .map((s) => [...s.matchAll(/mul\((\d+),(\d+)\)/g)])
  .flatMap((m) => m)
  .map((m) => m.slice(1, 3))
  .map((m) => m[0] * m[1])
  .reduce((a, b) => a + b, 0);

console.log(b);
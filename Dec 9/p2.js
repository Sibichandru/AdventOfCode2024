const fs = require('fs');
const path = require('path');

const choice = 1;
const file = ['input.txt', 'input.txt'][choice];
const data = fs.readFileSync(path.join(__dirname, file), 'utf8');

class Disk {
  constructor(size, initialData = null) {
    this.size = size;
    this.used = initialData === null ? 0 : size;
    this.data = new Array(size).fill(initialData);
  }

  get left() {
    return this.size - this.used;
  }

  add(d) {
    for (let i = 0; i < d.length; i++) {
      this.data[i + this.used] = d[i];
    }
    this.used += d.length;
  }

  clear() {
    this.used = 0;
    this.data.fill(null);
  }
}

const blocks = (() => {
  const res = [];
  for (let i = 0; i < data.length; i++) {
    res.push(new Disk(+data[i], i % 2 ? null : i / 2));
  }
  return res;
})();

for (let i = blocks.length - 1; i >= 0; i -= 2) {
  for (let j = 1; j < i; j += 2) {
    if (blocks[j].left >= blocks[i].size) {
      blocks[j].add(blocks[i].data);
      blocks[i].clear();
      break;
    }
  }
}

console.log(
  blocks
    .map((b) => b.data)
    .flat()
    .reduce((acc, v, i) => acc + (v === null ? 0 : v * i), 0)
);

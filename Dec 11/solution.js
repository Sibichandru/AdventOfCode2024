function solve(input) {
  let stones = input.split(' ').map(Number);

  const lenmap = {};
  const getLen = (n, it) => lenmap[n]?.[it];
  const setLen = (n, it, len) => {
    if (!lenmap[n]) lenmap[n] = { [it]: len };
    else lenmap[n][it] = len;
  };

  const getStoneCount = (stone, blinks) => {
    if (blinks === 0) return 1;

    // check cache if there is known information of how many stones this stone splits into after given amount of blinks
    const len = getLen(stone, blinks);
    if (len) return len;

    // no info in cache, calculate it and store in cache
    let result = null;
    if (stone === 0) {
      result = getStoneCount(1, blinks - 1);
    } else if (stone.toString().length % 2 === 0) {
      let str = stone.toString();
      result =
        getStoneCount(Number(str.slice(0, str.length / 2)), blinks - 1) +
        getStoneCount(Number(str.slice(str.length / 2)), blinks - 1);
    } else {
      result = getStoneCount(stone * 2024, blinks - 1);
    }

    setLen(stone, blinks, result);
    return result;
  };

  console.log(
    'Part 1:',
    stones.map((x) => getStoneCount(x, 25)).reduce((p, c) => (p += c), 0)
  );
  console.log(
    'Part 2:',
    stones.map((x) => getStoneCount(x, 75)).reduce((p, c) => (p += c), 0)
  );
}

solve('773 79858 0 71 213357 2937 1 3998391');

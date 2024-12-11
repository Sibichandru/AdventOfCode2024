const fs = require('fs');
const path = require('path');

function elapsedTime(name, fct, input) {
  const startTime = performance.now();
  const { result } = fct(input, startTime);
  const elapsed = performance.now() - startTime;
  console.log(
    `${name} time: ${Math.floor(elapsed / 60000)}:${Math.floor(
      (elapsed % 60000) / 1000
    )}:${Math.floor(elapsed % 1000)}`
  );
  console.log(`${name} result: ${result}`);
}

function readInput(filename) {
  const readRawInput = () => {
    const data = fs.readFileSync(path.join(filename));
    const input = data
      .toString()
      .split('\n')
      .filter((l) => l.length > 0)
      .map((l) => {
        const [r, s] = l.split(': ');
        const series = s.split(' ').map((v) => parseInt(v));
        return { result: parseInt(r), series };
      });
    return input;
  };
  try {
    return readRawInput();
  } catch (err) {
    console.error(err);
  }
}

const OPERATOR_1 = 'MUL';
const OPERATOR_2 = 'ADD';
const OPERATOR_3 = 'JOIN';

const OPERATION = {
  [OPERATOR_1]: (a, b) => a * b,
  [OPERATOR_2]: (a, b) => a + b,
  [OPERATOR_3]: (a, b) => parseInt(`${a}${b}`),
};

const calculateResult = (series, listOfOperators) => {
  let r = series[0];
  for (let index = 0; index < listOfOperators.length; index++) {
    const operator = listOfOperators[index];
    r = OPERATION[operator](r, series[index + 1]);
  }
  return r;
};

const findPermutation = (result, series, listOfOperators) => {
  function checkPermutation(currentPermutation = []) {
    if (currentPermutation.length === series.length - 1)
      return result === calculateResult(series, currentPermutation);

    // generate next permutation
    for (const operator of listOfOperators) {
      currentPermutation.push(operator);
      if (checkPermutation(currentPermutation)) return true;
      currentPermutation.pop();
    }
    // return false;
  }

  return checkPermutation();
};

function part1(input) {
  const operatorList = [OPERATOR_1, OPERATOR_2];
  const result = input.reduce(
    (r, { result, series }) =>
      findPermutation(result, series, operatorList) ? r + result : r,
    0
  );
  return { result };
}

function part2(input) {
  const operatorList = [OPERATOR_1, OPERATOR_2, OPERATOR_3];
  const result = input.reduce(
    (r, { result, series }) =>
      findPermutation(result, series, operatorList) ? r + result : r,
    0
  );
  return { result };
}

//const input = readInput(`d${DAY}-sample.txt`);
const input = readInput(`input.txt`);
elapsedTime('Part 1', part1, input);
// elapsedTime('Part 2', part2, input);

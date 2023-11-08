const fs = require('fs');
const readline = require('readline');
let length;
const maybes = new Map();
const filename = 'guesses';
let filenameCount = 0;

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// create output txt file
(function writeFile(data = '') {
  fs.writeFile(
    `${filename}${filenameCount > 0 ? `_${filenameCount}` : ''}.txt`,
    data,
    { flag: 'wx' },
    (err) => {
      if (err) {
        if (err.code === 'EEXIST') {
          ++filenameCount;
          writeFile(data);
        }
      }
    }
  );
})();

// ask for length until a number is given
(function askForLength(count = 0) {
  r1.question(
    `how long is the code? ${count ? 'please enter a number' : ''}\n`,
    (input) => {
      if (/[0-9]+/.test(input)) {
        length = input;
        console.log(
          'give your best guess for the character at each position\n'
        );
        generateQuestions(length);
      } else {
        askForLength(count + 1);
      }
    }
  );
})();

// keep asking for digits until the length of possibilities is traversed
function generateQuestions(remainingQuestions) {
  if (!remainingQuestions) {
    generatePossibilities();
    r1.close();
  } else {
    r1.question(`at the ${length - remainingQuestions} position\n`, (input) => {
      const splitted = input.split('');
      const nums = [];
      splitted.forEach((e) => {
        if (/[0-9]/.test(e)) nums.push(Number(e));
        else if (/[a-zA-Z]/.test(e)) nums.push(e);
      });
      maybes.set(length - remainingQuestions, nums);
      generateQuestions(remainingQuestions - 1);
    });
  }
}

// recursively generate possible combinations
function generatePossibilities(currCode = '', index = 0) {
  if (index === maybes.size) {
    fs.appendFile(
      `${filename}${filenameCount > 0 ? `_${filenameCount}` : ''}.txt`,
      `${currCode}\n`,
      (err) => {
        if (err) throw err;
        console.log(currCode);
      }
    );
  } else {
    if (!Array.isArray(maybes.get(index))) {
      generatePossibilities(currCode + maybes.get(index), index + 1);
    } else {
      maybes.get(index).forEach((e) => {
        generatePossibilities(currCode + e, index + 1);
      });
    }
  }
}

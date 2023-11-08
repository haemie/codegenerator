const fs = require('fs');
const readline = require('readline');
let length;
const maybes = new Map();

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r1.question('how long is the code? \n', (input) => {
  // console.log(`code is  ${input} long`);
  length = input;
  console.log('give your best guess for the character at each position\n');
  generateQuestions(length);
});

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

function generatePossibilities(currCode = '', index = 0) {
  // console.log(maybes);
  if (index === maybes.size) {
    fs.appendFile('guesses.txt', `${currCode}\n`, (err) => {
      if (err) throw err;
      console.log(currCode);
    });
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

// certain[0] = 'B';
// certain[1] = 1;
// certain[2] = 5;
// maybes.set(3, [8, 9]);
// maybes.set(4, [9, 3, 8, 0]);
// certain[5] = 1;
// maybes.set(6, [3, 8, 9, 2]);
// maybes.set(7, [9, 5, 6, 8]);
// certain[8] = 1;
// certain[9] = 'J';
// certain[10] = 6;
// certain[11] = 7;
// certain[12] = 'K';
// certain[13] = 6;
// certain[14] = 8;
// certain[15] = 'S';

// let currCode = '';
// for (let i = 0; i < certain.length; i++) {
//   if (certain[i] !== undefined) {
//     maybes.set(i, certain[i]);
//   }
// }

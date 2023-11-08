const length = 16;

const certain = Array(length);

certain[0] = 'B';
certain[1] = 1;
certain[2] = 5;
certain[5] = 1;
certain[8] = 1;
certain[9] = 'J';
certain[10] = 6;
certain[11] = 7;
certain[12] = 'K';
certain[13] = 6;
certain[14] = 8;
certain[15] = 'S';

const maybes = new Map();

maybes.set(3, [8, 9]);
maybes.set(4, [9, 3, 8, 0]);
maybes.set(6, [3, 8, 9, 2]);
maybes.set(7, [9, 5, 6, 8]);

let curr = '';
for (let i = 0; i < certain.length; i++) {
  if (certain[i] !== undefined) {
    maybes.set(i, certain[i]);
  }
}

function generatePossibilities(curr = '', index = 0) {
  if (index === maybes.size) {
    console.log(curr);
  } else {
    if (!Array.isArray(maybes.get(index))) {
      generatePossibilities(curr + maybes.get(index), index + 1);
    } else {
      maybes.get(index).forEach((e) => {
        generatePossibilities(curr + e, index + 1);
      });
    }
  }
}

generatePossibilities();

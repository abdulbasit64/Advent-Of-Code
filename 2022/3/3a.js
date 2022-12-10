const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input = input.split(/\r?\n/);

const priorities = [
  '1',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

let mistakes = [];
input.forEach(sack => {
  let compareSack = sack.slice(-1 * (sack.length / 2));
  for (let i = 0; i < sack.length / 2; i++) {
    if (compareSack.includes(sack[i])) {
      mistakes.push(sack[i]);
      break;
    }
  }
});
sumOfPriorites = 0;
mistakes.forEach(element => {
  sumOfPriorites += priorities.indexOf(element);
});
console.log(mistakes, sumOfPriorites);

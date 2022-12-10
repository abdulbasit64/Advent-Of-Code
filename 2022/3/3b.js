const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input = input.split(/\r?\n/);
// console.log(input)

let a = []
let badges = []
for (let i = 0; i < input.length; i+=3) {
	a.push([input[i], input[i+1], input[i+2]]) 
}
// console.log(a.slice(-3))
a.forEach(element => {
	for (let i = 0; i < element[0].length; i++) {
		if ((element[1].includes(element[0][i])) && (element[2].includes(element[0][i]))){
			badges.push(element[0][i])
			break;
		}
	}
});

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

let sumOfPriorites = 0
badges.forEach(badge => {
	sumOfPriorites += priorities.indexOf(badge);
});

console.log(sumOfPriorites)
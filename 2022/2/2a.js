const fs = require('fs');
let guide = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});

// [A = Rock, B = Paper, C = Scissors]
// [X = Rock, Y = Paper, Z = Scissors]

// 1 for Rock, 2 for Paper, and 3 for Scissors
// 0 if you lost, 3 if the round was a draw, and 6 if you won

guide = guide.split(/\r?\n/);
let opponent = guide.map(e => e[0]);
let player = guide.map(e => e[2]);

//	WINNING CONDITIONS
// win = ['AY', 'BZ', 'CX']
// draw = ['AX', 'BY', 'CZ']
// lose = ['AZ', 'BX', 'CY']

//	SCORES
// winScore = [2, 3, 1]
// drawScore = [1, 2, 3]
// loseScore = [3, 1, 2]

let outcomes = ['AY', 'BZ', 'CX', 'AX', 'BY', 'CZ', 'AZ', 'BX', 'CY'];
let score = [2, 3, 1, 1, 2, 3, 3, 1, 2];
let totalScore = 0;

opponent.forEach((baari, i) => {
  let result = outcomes.indexOf(`${baari}${player[i]}`);

  if (result < 3) {
    // Won
    totalScore += 6;
  } else if (result < 6) {
    // Draw
    totalScore += 3;
  }
  totalScore += score[result];
  
});
console.log('totalScore: ', totalScore)
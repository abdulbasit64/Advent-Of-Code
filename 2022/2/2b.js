const fs = require('fs');
let guide = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});


guide = guide.split(/\r?\n/);
let opponent = guide.map(e => e[0]);
let player = guide.map(e => e[2]);

// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win


// [A = Rock, B = Paper, C = Scissors]
// [X = Lose, Y = Draw, Z = Win]

// To lose
// return play in sequence of A B C
// toLose = ['C', 'A', 'B']
// toDraw = ['A', 'B', 'C']
// toWin  = ['B', 'C', 'A']

// 1 for Rock, 2 for Paper, and 3 for Scissors
// 0 if you lost, 3 if the round was a draw, and 6 if you won

//	SCORES
let winScore = [2, 3, 1]
let drawScore = [1, 2, 3]
let loseScore = [3, 1, 2]

let totalScore = 0;

opponent.forEach((baari, i) => {
	if (player[i] == 'Z'){
		totalScore += 6
		if (baari == 'A'){
			totalScore += winScore[0]
		}
		else if (baari == 'B'){
			totalScore += winScore[1]
		}
		else{
			totalScore += winScore[2]
		}
	}
	else if (player[i] == 'Y'){
		totalScore += 3
		if (baari == 'A')
			totalScore += drawScore[0]
		else if (baari == 'B')
			totalScore += drawScore[1]
		else
			totalScore += drawScore[2]
	}
	else {
		if (baari == 'A')
			totalScore += loseScore[0]
		else if (baari == 'B')
			totalScore += loseScore[1]
		else
			totalScore += loseScore[2]
	}
});
console.log('totalScore: ', totalScore)


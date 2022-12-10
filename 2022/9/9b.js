const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input = input.split(/\r?\n/);

// console.log(input);

let board = {
  0: {
    x: 0,
    y: 0,
  },
  1: {
    x: 0,
    y: 0,
  },
  2: {
    x: 0,
    y: 0,
  },
  3: {
    x: 0,
    y: 0,
  },
  4: {
    x: 0,
    y: 0,
  },
  5: {
    x: 0,
    y: 0,
  },
  6: {
    x: 0,
    y: 0,
  },
  7: {
    x: 0,
    y: 0,
  },
  8: {
    x: 0,
    y: 0,
  },
  9: {
    x: 0,
    y: 0,
  },
};

let tailMovement = [];

// R = x++
// L = x--
// U = y++
// D = y--
function moveTail() {
  for (let i = 1; i < Object.entries(board).length; i++) {
    let xDistance = board[i - 1].x - board[i].x;
    let yDistance = board[i - 1].y - board[i].y;
    if (
      (Math.abs(xDistance) >= 1 && Math.abs(yDistance) > 1) ||
      (Math.abs(xDistance) > 1 && Math.abs(yDistance) >= 1)
    ) {
      xDistance < 0 ? board[i].x-- : board[i].x++;
      yDistance < 0 ? board[i].y-- : board[i].y++;
    } else if (Math.abs(xDistance) > 1) {
      xDistance < 0 ? board[i].x-- : board[i].x++;
    } else if (Math.abs(yDistance) > 1) {
      yDistance < 0 ? board[i].y-- : board[i].y++;
    }
	// if (i==9){

	// 	console.log(board[i].x +' ' +board[i].y)
	// }
  }
  tailMovement.push(String(board[Object.entries(board).length-1].x) + String(board[Object.entries(board).length-1].y));
}
input.forEach(move => {
  let direction = move.split(' ')[0];
  let value = parseInt(move.split(' ')[1]);

  // T won't move if distance between T.x/T.y  and  H.x/H.y is <=1

  for (let i = 0; i < value; i++) {
    if (direction == 'R') {
      board[0].x++;
        moveTail();
    } else if (direction == 'L') {
      board[0].x--;
        moveTail();
    } else if (direction == 'U') {
      board[0].y++;
        moveTail();
    } else if (direction == 'D') {
      board[0].y--;
        moveTail();
    }
  }
});

// console.log(tailMovement)
let uniq = [...new Set(tailMovement)];
console.log('Part 2: ', uniq.length);

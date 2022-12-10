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
  H: {
    x: 0,
    y: 0,
  },
  T: {
    x: 0,
    y: 0,
  },
};

let tailMovement = []
let headMovement = []

// R = x++
// L = x--
// U = y++
// D = y--
function moveTail() {
  let xDistance = board.H.x - board.T.x;
  let yDistance = board.H.y - board.T.y;
  // console.log(xDistance, yDistance);
  if ((Math.abs(xDistance) >= 1 && Math.abs(yDistance) > 1) || (Math.abs(xDistance) > 1 && Math.abs(yDistance) >= 1)) {
    xDistance < 0 ? board.T.x-- : board.T.x++
    yDistance < 0 ? board.T.y-- : board.T.y++
  }
  else if (Math.abs(xDistance) > 1){
    xDistance < 0 ? board.T.x-- : board.T.x++
  }
  else if (Math.abs(yDistance) > 1){
    yDistance < 0 ? board.T.y-- : board.T.y++
  }
  // headMovement.push(String(board.H.x)+String(board.H.y))

  tailMovement.push(String(board.T.x)+String(board.T.y))
}
input.forEach(move => {
  let direction = move.split(' ')[0];
  let value = parseInt(move.split(' ')[1]);

  // T won't move if distance between T.x/T.y  and  H.x/H.y is <=1

  for (let i = 0; i < value; i++) {
    if (direction == 'R') {
      board.H.x++;
      moveTail();
    } else if (direction == 'L') {
      board.H.x--;
      moveTail();
    } else if (direction == 'U') {
      board.H.y++;
      moveTail();
    } else if (direction == 'D') {
      board.H.y--;
      moveTail();
    }
  }
});

// console.log(board);

let uniq = [...new Set(tailMovement)];
console.log('Part 1: ',uniq.length);




// CHECK OUTPUT
// let a = ''
// for (let i = 0; i < 200; i++) {
// 	a += headMovement[i] + "  -  " + tailMovement[i] + "\n"
// }
// // console.log(a)


// fs.appendFile('output.txt', a, err => {
// 	if (err) {
// 	  console.error(err);
// 	}
// 	// done!
//   });
const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input = input.split(/\r?\n/);
let rock = [];
let path = [];
for (let i = 0; i < input.length; i++) {
  let prev = null;
  path.push(input[i].split(' -> '));
  input[i].split(' -> ').forEach(point => {
    let [x, y] = point.split(',');
    x = parseInt(x);
    y = parseInt(y);
    if (prev != null) {
      let dx = x - prev[0];
      let dy = y - prev[1];
      let len = Math.max(Math.abs(dx), Math.abs(dy));
      for (let j = 0; j < len + 1; j++) {
        let xx = prev[0] + j * (dx > 0 ? 1 : dx < 0 ? -1 : 0);
        let yy = prev[1] + j * (dy > 0 ? 1 : dy < 0 ? -1 : 0);
        rock.push([xx, yy]);
      }
    }
    prev = [x, y];
  });
}

// Converting string to number (both method works. although second one is just magic, lol)
let rocks = Array.from(new Set(rock.map(JSON.stringify)), JSON.parse);
// let rocks = rock.filter(((t = {}), i => !(t[i] = i in t)));

// finding board size
let xMax = 500,
  xMin = 9999;
let yMax = 0;
for (let i = 0; i < path.length; i++) {
  const element = path[i];
  for (let j = 0; j < element.length; j++) {
    const x = element[j].split(',')[0];
    const y = element[j].split(',')[1];
    if (xMin > x) xMin = parseInt(x);
    if (xMax < x) xMax = parseInt(x);
    if (yMax < y) yMax = parseInt(y);
  }
}

let boardRocks = rocks.map(a => [a[0] - xMin, a[1]]);
let board = new Array(yMax + 1)
  .fill('.')
  .map(() => new Array(xMax - xMin + 1).fill('.'));
  for (let i = 0; i < boardRocks.length; i++) {
  board[boardRocks[i][1]][boardRocks[i][0]] = '#';
}
board[0][500 - xMin] = '+'

let abyss = false
for (let i = 0; i < 100000; i++) {
  let source = [500 - xMin, 0];
  while (true) {
    if (board[source[1] + 1][source[0]] == '.') {
      source[1] = source[1] + 1;
    }
    else if (board[source[1] + 1][source[0]] != '.') {
      if (board[source[1] + 1][source[0] - 1] == '.')
        source = [source[0] - 1, source[1] + 1];
      else if (board[source[1] + 1][source[0] - 1] == undefined){
        abyss = true
        break
      }
      else if (board[source[1] + 1][source[0] + 1] == '.')
        source = [source[0] + 1, source[1] + 1];
      else if (board[source[1] + 1][source[0] + 1] == undefined){
        abyss = true
        break
      }
      else {
        board[source[1]][source[0]] = 'o';
        break;
      }
    }
    else {
      board[source[1]][source[0]] = 'o';
      break;
    }
  }
  if (abyss){
    console.log('Part 1:',i);
    break
  }
}

// CHECK OUTPUT
let a = '';
for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    a += board[i][j];
  }
  a += '\n';
}
console.log(a);

fs.appendFile('output.txt', a, err => {
  if (err) {
    console.error(err);
  }
  // done!
});

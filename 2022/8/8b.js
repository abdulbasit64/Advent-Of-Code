const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input = input.split(/\r?\n/);

let grid = [];
input.forEach((a, i) => {
  grid[i] = [];
  grid[i].push(...a.split(''));
});

for (var i in grid) {
  for (let j = 0; j < grid[i].length; j++) {
    grid[i][j] = +grid[i][j];
  }
}
// console.log(grid)

let totalVisible = 0;
let hiddenFromSides = 0;
let scenicScores = [];
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    hiddenFromSides = 0;
    let score = 1;
    let idx = 1;
    // Top se
    if (i > 0) {
      idx = 1;
      for (let up = i - 1; up >= 0; up--) {
        if (grid[up][j] >= grid[i][j]) {
          hiddenFromSides++;
          break;
        }
        if (up != 0) idx++;
      }
      score *= idx;
    }
    // Left se
    if (j > 0) {
		idx = 1;
      for (let left = j - 1; left >= 0; left--) {
        if (grid[i][left] >= grid[i][j]) {
          hiddenFromSides++;
          break;
        }
        if (left > 0) idx++;
      }
      score *= idx;
    }
    // Right se
    if (j < grid[i].length) {
      idx = 1;
      for (let right = j + 1; right < grid[i].length; right++) {
        if (grid[i][right] >= grid[i][j]) {
          hiddenFromSides++;
          break;
        }
        if (right < grid[i].length - 1) idx++;
      }
      score *= idx;
    }
    // Bottom se
    if (i < grid.length) {
      idx = 1;
      for (let down = i + 1; down < grid.length; down++) {
        if (grid[down][j] >= grid[i][j]) {
          hiddenFromSides++;
          break;
        }
        if (down < grid.length - 1) idx++;
      }
      score *= idx;
    }
    scenicScores.push(score);
    if (hiddenFromSides < 4) {
      totalVisible++;
    }
  }
}

console.log('Part 1: ', totalVisible);
console.log('Part 2: ', Math.max(...scenicScores));

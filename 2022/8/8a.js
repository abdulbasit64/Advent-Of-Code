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
		grid[i][j] = +grid[i][j]
	}
}
console.log(grid)



let totalVisible = 0
let hiddenFromSides = 0
for (let i = 1; i < grid.length-1; i++) {
	for (let j = 1; j < grid[i].length-1; j++) {
		hiddenFromSides = 0

		// Left se
		if (j>0){
			// console.log('left se', grid[i][j])
			let checking = ""
			let old = hiddenFromSides
			for (let left = 0; left < j; left++) {
				checking += " "+grid[i][left]
				if (grid[i][left] >= grid[i][j]){
					hiddenFromSides++
					break;
				}
			}
			console.log(old == hiddenFromSides ? 'vis from left' : 'not from left')
		}
		// Top se
		if (i>0) {
			// console.log('Top se', grid[i][j])
			let checking = ""
			let old = hiddenFromSides
			for (let up = 0; up < i; up++) {
				checking += " "+grid[up][j]

				if (grid[up][j] >= grid[i][j]){
					hiddenFromSides++
					break;
				}
			}
			console.log(old == hiddenFromSides ? 'vis from up' : 'not from up')

			// console.log(checking)

		}
		// Right se
		if (j<grid[i].length) {
			// console.log('Right se', grid[i][j])
			let checking = ""
			let old = hiddenFromSides
			for (let right = j+1; right < grid[i].length; right++) {
				checking += " "+grid[i][right]

				if (grid[i][right] >= grid[i][j]){
					hiddenFromSides++
					break;
				}
			}
			console.log(old == hiddenFromSides ? 'vis from right' : 'not from right')

			// console.log(checking)

		}
		// Bottom se
		if (i<grid.length) {
			// console.log('Bottom se', grid[i][j])
			let checking = ""
			let old = hiddenFromSides

			for (let down = i+1; down < grid.length; down++) {
				checking += " "+grid[down][j]

				if (grid[down][j] >= grid[i][j]){
					hiddenFromSides++
					break;
				}
			}
			console.log(old == hiddenFromSides ? 'vis from bottom' : 'not from bottom')

			// console.log(checking)

		}
		if(hiddenFromSides<4){
			console.log(i,j+" - "+ grid[i][j] + ' is visible ----')
			totalVisible++
		}
		else{
			console.log(i,j+" - "+ grid[i][j] + ' NOT visible --')
		}
	}
}

console.log('Part 1: ', totalVisible + grid.length*2 + grid[0].length*2 - 4 )

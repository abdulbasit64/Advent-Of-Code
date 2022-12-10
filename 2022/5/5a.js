const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input.split(/\r?\n/);

// console.log(input)
const crates = input.split(/\r?\n /)[0].split(/\r?\n/)
const instructions = input.split(/\r?\n\r?\n/)[1].split(/\r?\n/)

// console.log(crates)
let coloumns = []
crates.forEach(element => {
	coloumns.push(element.match(/.{1,4}/g))
});

let instructsionsArr = []
instructions.forEach(element => {
	let line = element.split(' ')
	instructsionsArr.push([ parseInt(line[1]), parseInt(line[3]), parseInt(line[5])]) 
});
let lala = []

for (let i = 0; i < coloumns.length; i++) {
	for (let j = 0; j < coloumns[i].length; j++) {
		coloumns[i][j] = coloumns[i][j]!='    ' ? coloumns[i][j].trim() : '   '
	}
}


for (let i = 0; i < coloumns[0].length; i++) {
	lala.push([])
	for (let j = 0; j < coloumns.length; j++) {
		if (coloumns[j][i] != '   ')
			lala[i].push(coloumns[j][i])
	}
}
// console.log(lala)


for (let i = 0; i < instructsionsArr.length; i++) {
	// console.log(instructsionsArr[i])
	let move = instructsionsArr[i][0]
	let from = instructsionsArr[i][1] - 1
	let to = instructsionsArr[i][2] - 1
	for (let i = 0; i < move; i++) {
		lala[to].unshift( lala[from].shift() )
	}
}
// console.log(lala)
let topline = ''
for (let i = 0; i < lala.length; i++) {
	topline+=(lala[i][0][1])
}
console.log(topline)





// CHECK OUTPUT
// let a = ''
// for (let i = 0; i < lala.length; i++) {
// 	for (let j = 0; j < lala[i].length; j++) {
// 		a += lala[i][j]
// 	}
// 	a += '\n'
// }
// console.log(a)


// fs.appendFile('output.txt', a, err => {
// 	if (err) {
// 	  console.error(err);
// 	}
// 	// done!
//   });


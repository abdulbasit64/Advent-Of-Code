const { sign } = require('crypto');
const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input = input.split(/\r?\n/);

let registerX = [1]

for (let i = 0; i < input.length; i++) {
	let prevCommand = i>0 ? input[i-1].slice(0,4) : ""
	let command = input[i].slice(0,4)
	if (command == "noop"){
		if (i>0 && prevCommand == "addx"){
			let value = parseFloat(input[i-1].slice(5))
			registerX.push(registerX[registerX.length-1] + value)
		}
		else if (i!=0)
			registerX.push(registerX[registerX.length-1])
	}
	else if(command == "addx"){
		if (i>0 && prevCommand == "addx"){
			let value = parseFloat(input[i-1].slice(5))
			registerX.push(registerX[registerX.length-1] + value)
		}
		else if (i!=0)
			registerX.push(registerX[registerX.length-1])
		registerX.push(registerX[registerX.length-1])
	}
	
}

let CRT = new Array(240).fill('.')

for (let i = 0; i < 6; i++) {
	let line = 40*i
	for (let j = 0; j < 40; j++) {
		if (registerX[line + j]-1 == j){
			CRT[line + j] = '#'
		}
		if (registerX[line + j] == j){
			CRT[line + j] = '#';
		}
		if (registerX[line+ j] +1  == j){
			CRT[line + j] = '#'
		}
	}
}

let a = ''
for (let i = 0; i < CRT.length; i++) {
		a += CRT[i]
	if ((i+1)%40==0)
		a += '\n'
}

fs.appendFile('output.txt', a, err => {
	if (err) {
	  console.error(err);
	}
	// done!
  });

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

// Signal strength = cycle * regixterX Value
// 20th, 60th, 100th, 140th, 180th, and 220th
let checkStrengthOnCycle = [20, 60, 100, 140, 180, 220]
let signalStrength=0;
checkStrengthOnCycle.forEach(element => {
	signalStrength += registerX[element-1]*element
});
console.log("Part 1:",signalStrength)
const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
// input = input.split(/\r?\n/);
// console.log(input)

let startOfPacket = 0
for (let i = 3; i < input.length; i++) {
	if (!(input.slice(i-3, i)).includes(input[i]) && !(input.slice(i-3, i-1)).includes(input[i-1]) && (input[i-2]!=input[i-3])){
		startOfPacket = i
		console.log(startOfPacket+1)
		break;
	}
}


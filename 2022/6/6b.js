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
		console.log(i+1)
		startOfPacket = i
		break;
	}
}

let message = -1
for (let i = startOfPacket; i < input.length; i++) {
	let allDistinct = true
	for (let j = 0; j < 13; j++) {
		if (input.slice(i-13, i-j).includes(input[i-j])){
			// Plus one because it will be in the next loop that there will be no match and this if case won't be triggered
			message=i+1
			allDistinct = false
			break;
		}
	}
	if (allDistinct == true){
		// plus one for start of character not index
		console.log('startOfMessage: ', message+1)
		break;
	}
}
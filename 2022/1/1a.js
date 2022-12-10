const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data
});
input = input.split(/\r?\n/)
let sums = []
let position = 0
let total = 0
input.forEach(element => {
	
	if (element != ""){
		total+=parseInt(element)
	}
	else{
		sums[position] = total
		total = 0
		position++
	}
});

sums.sort
sums.sort(function(a, b) {
	return b - a;
});
console.log(`${sums[0]} + ${sums[1]} + ${sums[2]}`)
let top3 = sums[0] + sums[1] + sums[2]
console.log(top3)



const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input = input.split(/\r?\n/);
let pairs = []
input.forEach(element => {
	pairs.push(element.split(','))
});

overlappingJobCount = 0
pairs.forEach(job => {	
	if(parseInt(job[0].split('-')[0]) <= parseInt(job[1].split('-')[0]) && parseInt(job[0].split('-')[1]) >= parseInt(job[1].split('-')[1])){
		overlappingJobCount++;
	}
	else if(parseInt(job[1].split('-')[0]) <= parseInt(job[0].split('-')[0]) && parseInt(job[1].split('-')[1]) >= parseInt(job[0].split('-')[1])){
		overlappingJobCount++;
	}
});
console.log(overlappingJobCount)


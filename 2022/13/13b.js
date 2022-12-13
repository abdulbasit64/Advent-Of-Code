const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input = input.split(/\r?\n\r?\n/).map(a => (a.split(/\r?\n/)))
for (let i = 0; i < input.length; i++) {
	input[i] = ((input[i]).map(el => {
	  return JSON.parse(el)
	}))
}

const injection = [[[2]], [[6]]];
const dumpParsed = [...input.flatMap((p) => p), ...injection];

function diff(left, right){
	if (Array.isArray(left) && Array.isArray(right)) {
	  for (let i = 0; i < left.length && i < right.length; i++) {
		const c = diff(left[i], right[i]);
		if (c !== undefined) {
		  return c;
		}
	  }
	  if (left.length > right.length) return false;
	  if (left.length < right.length) return true;
	  return undefined;
	} else if (typeof left === "number" && typeof right === "number") {
	  if (left > right) return false;
	  if (left < right) return true;
	  return undefined;
	} else {
	  return diff(typeof left === 'number' ? [left] : left, typeof right === 'number' ? [right] : right);
	}
}

correctOrder = dumpParsed.sort((a, b) => {
  const c = diff(a, b);
  if (c === undefined) {
    return 0;
  }
  return c ? -1 : 1;
});

let decoderKey = 1
correctOrder.forEach((element, i) => {
	if (element.join()==[[2]] || element.join() == [[6]])
		decoderKey *= (i+1);
});

console.log('Part 2:',decoderKey);
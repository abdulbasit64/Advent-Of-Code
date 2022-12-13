const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input = input.split(/\r?\n\r?\n/).map(a => (a.split(/\r?\n/)))

let indexes = []

function compare(left, right) {
  if (left === undefined && right === undefined)
    return
  if (left == undefined)
    return true;
  if (right == undefined)
    return false

  if (typeof left == 'object' && typeof right == 'object'){
    if (left.length == 0 && right.length > 0)
      return true
    for (let k = 0; k < left.length; k++) {
      let result =  compare(left[k], right[k]);
      if (result === true || result === false)
        return result
    }
  }

  if (typeof left == 'number' && typeof right == 'number'){
    if (right < left)
      return false
    else if (left < right)
      return true
    else
      return
  }

  else if (typeof left == 'number' && typeof right != 'number'){
    left = [left]
    return compare(left, right)
  }
  else if (typeof left != 'number' && typeof right == 'number'){
    right = [right]
    return compare(left, right)
  }
  return
}

for (let i = 0; i < input.length; i++) {
  let element =(input[i]).map(el => {
    return JSON.parse(el)
  });
  for (let j = 0; j < (element[0].length <= element[1].length) ? element[1].length : element[0].length; j++) {
    let left = element[0][j]
    let right = element[1][j]
    let order = compare(left, right)
    if (order === true){
      indexes.push(i+1)
      break;
    }
    else if (order === false)
      break
  }
}

console.log('Part 1:', indexes.reduce((a,b) => a+b))
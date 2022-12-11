const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input = input.split(/\r?\n/)
let monkeys = {
  // itemsInspected: 0
}

for (let i = 0; i < input.length; i++) {
  let isMonkey = input[i].slice(0, 6) == 'Monkey'
  let monkeyNo = input[i].slice(7, 8)
  if (isMonkey){
    monkeys[monkeyNo] = {
      itemsInspected: 0,
      startingItems: (input[++i].slice(18).split(', ')).map(a => parseInt(a)),
      worryLevel: input[++i].slice(23).split(' '),
      divideBy: [parseInt(input[++i].slice(21)), input[++i].split('throw to monkey ')[1], input[++i].split('throw to monkey ')[1]],
    }
  }
}

function worryValue(item, operator, value) {
  return eval(item+operator+ (value=='old' ? item : value))
}

for (let k = 0; k < 20; k++) {
  for (let i = 0; i < Object.keys(monkeys).length; i++) {
  let innerLoopLength = monkeys[i].startingItems.length
  for (let j = 0; j < innerLoopLength; j++) {
    monkeys[i].itemsInspected++;
    const item = monkeys[i].startingItems.shift();
    // Operation
    let worryLevel = worryValue(item, monkeys[i].worryLevel[0], monkeys[i].worryLevel[1])
    worryLevel = Math.floor(worryLevel / 3)
    if (worryLevel % monkeys[i].divideBy[0] == 0)
      monkeys[monkeys[i].divideBy[1]].startingItems.push(worryLevel)
      else
      monkeys[monkeys[i].divideBy[2]].startingItems.push(worryLevel)
    }
  }
}
let inspections = []
Object.keys(monkeys).forEach(a =>{
  inspections.push(monkeys[a].itemsInspected);
})
let top2MonkeyBusiness = inspections.sort((x, y) => y - x).slice(0, 2).reduce( (a,b) => a * b )
console.log("Inspections by each monkey:",inspections)
console.log('Part 1:',top2MonkeyBusiness)



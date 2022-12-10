// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.x = void 0;
// exports.x = "";
const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
	if (err) {
	  console.error(err);
	  return;
	}
	return data;
  });
input = input.split(/\r?\n/);

// console.log(input);


let fileSystem = { files: {}, dirs: {} };
let current = fileSystem;
for (let i = 0; i < input.length; i++) {
    let command = input[i];
    let a = command.split(" "), cmd = a[0], rest = a.slice(1);
    if (cmd === "$") {
        if (rest[0] === "cd") {
            let dir = rest[1];
            if (dir === "..") {
                current = current.parent;
            }
            else if (dir === "/") {
                current = fileSystem;
            }
            else {
                if (!current.dirs[dir]) {
                    current.dirs[dir] = { parent: current, files: {}, dirs: {} };
                }
                current = current.dirs[dir];
            }
        }
    }
    else if (cmd !== "dir") {
        current.files[rest[0]] = parseInt(cmd);
    }
}
let dirSizes = [];
let computeFileSize = function (curr) {
    let size = 0;
    for (let file in curr.files) {
        size += curr.files[file];
    }
    for (let dir in curr.dirs) {
        let dirSize = computeFileSize(curr.dirs[dir]);
        size += dirSize;
        dirSizes.push(dirSize);
    }
    return size;
};

computeFileSize(fileSystem);
// console.log(dirSizes)

// let sumOfSub100k = dirSizes
//     .filter(function (x) { return x <= 100000; })
//     .reduce(function (a, b) { return a + b; });
// console.log("part 1:", sumOfSub100k);


const rootSize = computeFileSize(fileSystem);

const smallestThatFixesSpace = Math.min(
  ...dirSizes.filter((x) => x >= 30000000 - (70000000 - rootSize))
);
console.log("part 2:", smallestThatFixesSpace);
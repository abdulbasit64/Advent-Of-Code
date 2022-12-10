const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  return data;
});
input = input.split(/\r?\n/);

// console.log(input)


let fileSystem = {}

function directory(folder, files) {
	// console.log({folder, files})

	fileSystem[folder] = files
}

let files = []

var currentPath = []
let size = 0
let totalDirectories = 0
let dirWithSize = []
for (let i = 0; i < input.length; i++) {
	let line = input[i]
	if (line.slice(0,4) == '$ cd'){
		if (line == '$ cd ..'){
			let path = [...currentPath]
			// console.log(currentPath.pop()+": "+size)
			dirWithSize.push({path, dir: currentPath.pop(), size})
			// console.log()
		}
		else{
			currentPath.push(line.slice(5))
			size = 0
		}
	}
	else if (line.slice(0,4) == '$ ls'){
		
	}
	else if (line.slice(0,4) != "dir "){
		size += parseInt(line.split(" ")[0])
	}
}




// for (let i = 0; i < input.length; i++) {
// 	let line = input[i].slice(0, 4)
// 	if (line == '$ cd'){
// 		// Change Directory
// 	}
// 	else{
// 		if (line == '$ ls'){
// 			// List files
// 			let folder = input[i-1].slice(5)
// 			let files = []
// 			while (i+1 < input.length && input[i+1][0] != '$') {
// 				files.push(input[i+1])
// 				i++;
// 			}
// 			directory(folder, files)
// 			// console.log(files)
// 		}
// 	}	
// }

dirWithSize.forEach(a => {
	console.log(a)
})
// console.log(dirWithSize)














// CHECK OUTPUT
// let a = JSON.stringify(fileSystem)
// console.log(a)


// fs.appendFile('output.json', a, err => {
// 	if (err) {
// 	  console.error(err);
// 	}
// 	// done!
//   });
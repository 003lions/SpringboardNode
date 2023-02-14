// Step 1
// In step1.js, write a function, cat.
//
//   It should take one argument, path, and it should read the file with that path, and print the contents of that file.
//
//   Then, write some code that calls that function, allowing you to specify the path argument via the command line.
//   For example:
//     $ node step1.js one.txt
//
// This is file one.
//   If you give it the path of a non-existent file, it should print that error and halt the script execution:
//   $ node step1.js huh.txt
// Error reading huh.txt:
// Error: ENOENT: no such file or directory, open 'huh.txt'

const fs = require('fs');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', (error, data) => {
    if (err) {
      // handle possible error
      console.error(`Error reading ${path}:\n  ${error}`);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    // otherwise success
    console.log(`file contents: ${data}`);
})
}

cat(process.argv[2]);

// Execute within terminal
// (base) lions@Madras:~/Springboard/Node/.idea/Unit31_04-intro-node/node-files$
// node step1.js one.txt
// file contents: This is file one.
//
//
// node step1.js huh.txt
// Error reading huh.txt:
//   Error: ENOENT: no such file or directory, open 'huh.txt'

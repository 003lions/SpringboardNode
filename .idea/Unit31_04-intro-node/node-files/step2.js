// Step 2
// Copy over your step1.js code to step2.js
//
// Add a new function, webCat.
//   This should take a URL and, using axios,
//   should read the content of that URL and print it to the console.
//
//   Modify the code that invoked cat so that, based on the command-line args,
//   it decides whether the argument is a file path or a URL and calls either cat or webCat,
//   respectively.

const axios = require('axios');
const fs = require('fs');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', (error, data) => {
    if (error) {
      // handle possible error
      console.error(`Error reading ${path}:\n  ${error}`);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    // otherwise success
    console.log(`file contents: ${data}`);
  })
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
      // handle possible error
      console.error(`Error fetching ${url}:\n  ${error}`);
      // kill the process and tell the shell it errored
      process.exit(1);
  }
}

let parameter = process.argv[2];

if (parameter.toLowerCase().startsWith('http')) {
  webCat(parameter);
} else {
  cat(parameter);
}

// Execute within terminal
// (base) lions@Madras:~/Springboard/Node/.idea/Unit31_04-intro-node/node-files$
// node step2.js one.txt
// file contents: This is file one.
//
// node step2.js huh.txt
// Error reading huh.txt:
//   Error: ENOENT: no such file or directory, open 'huh.txt'
//
// node step2.js http://google.com
// <!doctype html><html
//
// node step2.js http://rithmschool.com/no-such-path
//   Error fetching http://rithmschool.com/no-such-path:
//   AxiosError: Request failed with status code 404
// Step 3
// Add a feature where, on the command line, you can optionally provide an argument to
// output to a file instead of printing to the console.
//
// The argument should look like this: --out output-filename.txt readfile-or-url.

const axios = require('axios');
const fs = require('fs');
const process = require('process');

async function writeToOutputFile(data, filename) {
  try {
    await fs.writeFileSync(filename, data);
  } catch (error) {
    console.error(`Couldn't write ${filename}:\n  ${error}`)
    process.exit(1);
  }
}

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

function catWrite(path, filename) {
  fs.readFile(path, 'utf8', (error, data) => {
    if (error) {
      // handle possible error
      console.error(`Error reading ${path}:\n  ${error}`);
      // kill the process and tell the shell it errored
      process.exit(1);
    }
    try {
      writeToOutputFile(data, filename)
      console.log(`# no output, but ${filename} contains contents of one.txt`);
    } catch (error) {
      cat(parameter);
    }
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

async function webCatWrite(url, filename) {
  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    console.error(`Error fetching ${url}:\n  ${error}`);
    process.exit(1);
  }
  try {
    await writeToOutputFile(response.data, filename);
    console.log(`# no output, but ${filename} contains HTML`);
  } catch (error) {
    process.exit(1);
  }
}

if (process.argv[2] === '--out') {
  // node step3.js --out new.txt one.txt
  if (process.argv[4].toLowerCase().startsWith('http')) {
    webCatWrite(process.argv[4], process.argv[3]);
  } else {
    catWrite(process.argv[4], process.argv[3]);
  }
} else {
  // node step3.js one.txt
  if (process.argv[2].toLowerCase().startsWith('http')) {
    webCat(process.argv[2]);
  } else {
    cat(process.argv[2]);
  }
}

// Execute within terminal
// (base) lions@Madras:~/Springboard/Node/.idea/Unit31_04-intro-node/node-files$
// node step3.js one.txt
//   file contents: This is file one.
//
// node step3.js huh.txt
//   Error reading huh.txt:
//     Error: ENOENT: no such file or directory, open 'huh.txt'
//
// node step3.js http://google.com
//   !doctype html><html
//
// node step3.js http://rithmschool.com/no-such-path
//   Error fetching http://rithmschool.com/no-such-path:
//     AxiosError: Request failed with status code 404
//
// node step3.js --out out.txt one.txt
//   # no output, but out.txt contains contents of one.txt
//
// node step3.js --out out.txt huh.txt
//   Error reading huh.txt:
//     Error: ENOENT: no such file or directory, open 'huh.txt'
//
// node step3.js --out out.txt http://google.com
//   # no output, but out.txt contains HTML
//
// node step3.js --out out.txt http://rithmschool.com/no-such-path
//   Error fetching http://rithmschool.com/no-such-path:
//   AxiosError: Request failed with status code 404


/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");


/** Make Markov machine from text and generate text from it. */
function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
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
    generateText(data)
  })
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    generateText(response.data);
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
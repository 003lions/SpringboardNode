// "error-first" pattern

const fs = require('fs');

const content = 'THIS WILL GO IN THE FILE!';

// fs.writeFile('./files/output.txt', content, "utf8", function(err) {
fs.writeFile('./files/output.txt', content, { encoding: "utf8", flag: 'a' }, (err) => {
  if (err) {
    console.error("ERROR: ", err);
    process.exit(1);
  }
  console.log('Successfully wrote to file!');
});

console.log('writing file...');
// file won't have been written yet at this point

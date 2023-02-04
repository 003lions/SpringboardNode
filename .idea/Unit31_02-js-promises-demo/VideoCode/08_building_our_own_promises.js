// Asynchronous Function Pattern

// function myAsyncFunction() {
//   // return a new Promise
//   return new Promise((resolve, reject) => {
//     // Do Async stuff
//
//     // if it suceeds, call the resolve callback
//     resolve( /* success value */);
//     // if it fails, call the reject callback
//     reject( /* fail value */);
//   });
// }

// function wait3Seconds() {
//   // return a new Promise
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, 3000)
//     // setTimeout(reject, 3000)
//   });
// }
//
// wait3Seconds()
//   .then(() => console.log("All Done!"))
//   .catch(() => console.log("Error!"))

// Change Hello colour
function  changeColour(element, color) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { element.style.color = color;
      resolve()
    }, 1000)
  })
}

changeColour(h1, 'red')
  .then(() => changeColour(h1, 'orange'))
  .then(() => changeColour(h1, 'yellow'))
  .then(() => changeColour(h1, 'green'))
  .then(() => changeColour(h1, 'blue'))
  .then(() => changeColour(h1, 'indigo'))
  .then(() => changeColour(h1, 'violet'))


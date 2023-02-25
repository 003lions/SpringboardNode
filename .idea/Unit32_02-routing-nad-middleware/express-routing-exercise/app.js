/** Demo app for routing. */

const express = require('express');
const ExpressError = require("./expressError")
const app = express();
const userRoutes = require('./routes');

const { validateParameter } = require("./param");

app.use(express.json());
// use the router middleware
//  apply a prefix to every route in userRoutes
app.use('/users', userRoutes);

// this applies to all requests at all paths
app.use(function(req, res, next) {
  console.log(`A ${req.method} request
                is coming to "${req.path}"!`);
  // transfer control to the next matching handler
  return next();
});
///////////////////////////////
// mean (average)   /mean?nums=1,3,5,7
// response: {
//   operation: "mean",
//   value: 4
// }
//  The app should “gracefully” handle the following errors:
// Passing in an invalid number (NaN errors).
// For instance, /mean?nums=foo,2,3 should respond with a 400 Bad Request status code and a response that saying something like: foo is not a number.
// Empty input: /mean without passing any nums should respond with a 400 Bad Request status code saying something like nums are required.
app.get('/mean', function(req, res, next) {
  try {

  }
  return res.send('Hello ' + req.params.name);
});
// median (midpoint)    /median?nums=1,3,5,7
// // response: {
// //   operation: "median",
// //   value: 4
// // }

// mode (most frequent)

// all (most frequent)
//response: {
//   operation: "all",
//   mean: 12
//   median: 10,
//   mode: 8
// }
////////////////////////////////
// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError)
});

// generic error handler
app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});
// end generic handler
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
// end app.listen

const express = require('express');
const ExpressError = require("./expressError")
const { validateParameter } = require("./param");

const app = express();
app.use(express.json());

// server log for all requests at all paths
app.use(function(req, res, next) {
  console.log(`A ${req.method} request is coming to "${req.path}"!`);
  // transfer control to the next matching handler
  return next();
});

///////////////////////////////
// mean (average)   http://localhost:3000/mean?nums=1,3,5,7
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
    // http://localhost:3000/mean?num=1,3,5,7
    if (!req.query.nums)
      throw new ExpressError("Parameter nums is required, for example /mean?nums=1,2,3,4", 400);

    const numbers = validateParameter(req.query.nums)

    // http://localhost:3000/mean?nums=1,b,5,7
    if (numbers.includes(NaN))
      throw new ExpressError("Invalid nums.Numbers only, for example /mean?nums=1,2,3,4.", 400);

    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;4

    // http://localhost:3000/mean?nums=1,2,3,4
    const result = {
      response: {
        operation: "mean",
        value: mean,
      },
    };
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

// median (midpoint)    /median?nums=1,3,5,7
// // response: {
// //   operation: "median",
// //   value: 4
// // }

// mode (most frequent)  /mode?nums=1,3,5,7

// all (most frequent)   /all?nums=1,3,5,7
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

// // generic error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  // set the status and alert the user
  return res.json({
    error: err,
    message: err.message
  });
});

// end generic handler
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
// end app.listen


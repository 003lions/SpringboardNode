const validateParameter = (param) => {
  const splitParams = param.split(",");
  for(let num in splitParams) {
    if (num * 1 === NaN) {
      console.log('not all numbers')
    }
  }
};

module.exports = { validateParameter };


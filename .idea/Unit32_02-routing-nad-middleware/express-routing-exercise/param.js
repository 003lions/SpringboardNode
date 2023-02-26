const validateParameter = (param) => {
  const splitParams = param.split(",");
  const numbers = splitParams.map(Number)
  return numbers
};

module.exports = { validateParameter };

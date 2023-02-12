const commonErrorHandler = (message, statusCode = 500) => {
  let errorMessage = 'Something went wrong. Please try again';
  if (message) {
    errorMessage = message;
  }
  const response = {
    statusCode,
    data: {},
    message: errorMessage,
    error: true,
  };
return response;
};


module.exports = {
  commonErrorHandler,
};

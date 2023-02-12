/* eslint-disable no-console */
// const { commonErrorHandler } = require('../helper/errorHandler');
const userService = require('../services/user');

// eslint-disable-next-line consistent-return
const userSignup = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await userService.userSignup(payload);
    res.data = data;
    res.statusCode = 201;
    next();
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
};

module.exports = {
  userSignup,
};

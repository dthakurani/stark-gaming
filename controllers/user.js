/* eslint-disable consistent-return */
/* eslint-disable no-console */

const userService = require('../services/user');

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

const userLogin = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await userService.userLogin(payload);
    res.data = data;
    next();
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
};

module.exports = {
  userSignup,
  userLogin,
};

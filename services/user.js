const bcrypt = require('bcrypt');

const models = require('../models');
const { commonErrorHandler } = require('../helper/errorHandler');

const userSignup = async (payload) => {
  // eslint-disable-next-line no-param-reassign
  payload.password = await bcrypt.hash(payload.password, 10);

  const existingUser = await models.User.findOne({
    where: { email: payload.email },
  });
  if (existingUser) {
    throw commonErrorHandler('User already exists', 404);
  }

  const user = await models.User.create(payload);

  return user;
};

module.exports = {
  userSignup,
};

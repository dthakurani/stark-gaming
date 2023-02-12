const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const userLogin = async (payload) => {
  const { email, password } = payload;
  const user = await models.User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw commonErrorHandler('User Not Found!', 404);
  }

  const match = await bcrypt.compareSync(password, user.dataValues.password);
  if (!match) throw commonErrorHandler('Wrong email or password', 401);

  const refreshTokenId = crypto.randomUUID();
  const accessTokenId = crypto.randomUUID();

  const alreadyLogin = await models.UserLogin.findOne({
    userId: user.id,
  });

  if (alreadyLogin) throw commonErrorHandler('Already loged in', 400);
  await models.UserLogin.create({
    userId: user.id,
    refreshTokenId,
    accessTokenId,
  });
  const refreshToken = jwt.sign(
    { userId: user.dataValues.id, tokenId: refreshTokenId },
    process.env.SECRET_KEY_REFRESH,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
    }
  );

  const accessToken = jwt.sign(
    { userId: user.dataValues.id, tokenId: accessTokenId },
    process.env.SECRET_KEY_ACCESS,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    }
  );
  return {
    id: user.id,
    email: user.email,
    accessToken,
    refreshToken,
  };
};

module.exports = {
  userSignup,
  userLogin,
};

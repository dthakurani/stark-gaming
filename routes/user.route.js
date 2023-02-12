const { Router } = require('express');

const userController = require('../controllers/user');
const genericResponse = require('../helper/genericResponse');
const userValidator = require('../validators/user');
const userSerializer = require('../serializers/user');

const router = Router();

router.post(
  '/',
  userValidator.signupSchema,
  userController.userSignup,
  userSerializer.userSignupData,
  genericResponse.sendResponse
);

module.exports = router;

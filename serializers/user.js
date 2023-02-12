const userSignupData = async (req, res, next) => {
  const recievedData = res.data || {};
  let resultData;
  if (recievedData) {
    resultData = {
      id: recievedData.dataValues.id,
      name: recievedData.dataValues.name,
      email: recievedData.dataValues.email,
    };
  }
  res.data = resultData;
  res.statusCode = 201;
  next();
};

module.exports = {
  userSignupData,
};

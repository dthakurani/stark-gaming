module.exports = {
  sendResponse: async (req, res) => {
    const response = {
      statusCode: res.statusCode || 200,
      data: res.data || {},
      message: 'Success',
    };
    return res.status(response.statusCode).json(response);
  },
};

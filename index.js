/* eslint-disable no-console */
require('dotenv').config();

const app = require('./app');

const startServer = async () => {
  try {
    app.listen(process.env.SERVER_PORT);
    console.log(`--- Server started on ${process.env.SERVER_PORT} ---\n\n`);
  } catch (err) {
    console.error('server setup failed', err);
    console.error('Error: ', err.message);
  }
};

startServer();

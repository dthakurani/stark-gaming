/* eslint-disable no-console */
require('dotenv').config();

const app = require('./app');
const { sequelize } = require('./models');

const startServer = async () => {
  try {
    sequelize.authenticate();
    console.log('... Service db ✔');
    app.listen(process.env.SERVER_PORT);
    console.log(`--- Server started on ${process.env.SERVER_PORT} ---\n\n`);
  } catch (err) {
    console.error('server setup failed', err);
    console.error('Error: ', err.message);
  }
};

startServer();

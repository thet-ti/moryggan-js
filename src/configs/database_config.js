// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register');
require('core-js/stable');
require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'moryggan-db',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register');
require('core-js/stable');

const env = require('../utils/env');

module.exports = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  dialect: 'mysql',
};

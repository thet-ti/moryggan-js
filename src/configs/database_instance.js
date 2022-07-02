/* eslint-disable global-require */
import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import { NodeEnvEnum } from '../enumerators/node_env';
import { env } from '../utils/env';
import { logger } from '../utils/logger';

// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register');
require('core-js/stable');

const sequelize = new Sequelize(
  env.DB_DATABASE,
  env.DB_USERNAME,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    dialect: 'mysql',
    logging: (str) => {
      if (env.NODE_ENV === NodeEnvEnum.DEV) {
        logger.info(str);
      }
    },
  },
);

export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error(error.original.sqlMessage);
  }
};

const db = {
  sequelize,
  Sequelize,
  models: {},
};

const modelsDir = path.join(process.cwd(), 'src', 'models');

fs
  .readdirSync(modelsDir)
  .filter((f) => f.endsWith('.js'))
  .forEach((f) => {
    // eslint-disable-next-line import/no-dynamic-require
    let model = require(path.join(modelsDir, f));

    model = model.default(sequelize, Sequelize.DataTypes);

    db.models[model.name] = model;
  });

Object.keys(db.models).forEach((modelName) => {
  if (db.models[modelName].associate) {
    db.models[modelName].associate(db.models);
  }
});

export { db };

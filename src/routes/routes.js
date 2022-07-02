/* eslint-disable global-require */
import express from 'express';
import fs from 'fs';
import path from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register');
require('core-js/stable');

const controllersDir = path.join(process.cwd(), 'src', 'controllers');

const router = express.Router();

router.appRoutes = [];

fs
  .readdirSync(controllersDir)
  .filter((f) => f.endsWith('.js'))
  .forEach((f) => {
    // eslint-disable-next-line import/no-dynamic-require
    const controller = require(path.join(controllersDir, f)).default;

    router.use(`/${f.replaceAll('_controller.js', '')}`, controller);
    router.appRoutes = [...router.appRoutes, `/${f.replaceAll('_controller.js', '')}`];
  });

export { router };

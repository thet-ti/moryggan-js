import errorHandler from 'errorhandler';
import express from 'express';
import morgan from 'morgan';
import { dbConnect } from './configs/database.instance';
import { env } from './utils/env';
import { logger } from './utils/logger';

const app = express();

app.set('port', env.NODE_PORT);
app.use(errorHandler());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

dbConnect();
app.listen(() => logger.info(`Server running on port: ${env.NODE_PORT}`));

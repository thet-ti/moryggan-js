import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import morgan from 'morgan';
import { dbConnect } from './configs/database_instance';
import { router as routes } from './routes/routes';
import { env } from './utils/env';
import { logger } from './utils/logger';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(errorHandler());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/api', routes);

dbConnect();
app.listen(env.NODE_PORT, () => logger.info(`Server running on port: ${env.NODE_PORT}`));

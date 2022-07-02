import errorHandler from 'errorhandler';
import express from 'express';
import morgan from 'morgan';
import { env } from './utils/env';

const app = express();

app.set('port', env.NODE_PORT);
app.use(errorHandler());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.listen(() => console.log(`Server running on port: ${env.NODE_PORT}`));

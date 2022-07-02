import { createLogger, transports, format } from 'winston';
import moment from 'moment';

export const logger = createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.printf(({ level, message }) => `[${moment().format('DD/MM/YYYY - HH:mm:ss')}] ${level}: ${message}`),
  ),
});

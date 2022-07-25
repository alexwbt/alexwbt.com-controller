import * as winston from 'winston';
import { getEnvStringRequired } from './env';

require('winston-daily-rotate-file');

const timestampFormat = () => new Date().toLocaleTimeString('en-US', {
  timeZone: getEnvStringRequired("LOGGER_TIMEZONE"),
  hour12: false
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: timestampFormat }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new winston.transports.Console(),
    new (winston.transports as any).DailyRotateFile({
      dirname: 'log',
      filename: '%DATE%.log',
      datePattern: 'DD-MM-YYYY',
    }),
  ],
});

export default logger;

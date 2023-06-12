import winston from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '../config';
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp),
    hour = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} -> [${label}] ${level}: ${message}`;
});

const logger = createInfoLogger();
const errorLogger = createErrorLogger();

function createInfoLogger(): winston.Logger {
  if (config.env === 'development') {
    return winston.createLogger({
      level: 'info',
      format: combine(label({ label: 'UM' }), timestamp(), myFormat),
      transports: [new winston.transports.Console()],
    });
  } else {
    return winston.createLogger({
      level: 'info',
      format: combine(label({ label: 'UM' }), timestamp(), myFormat),
      transports: [
        new DailyRotateFile({
          filename: path.join(
            process.cwd(),
            'logs',
            'winston',
            'successes',
            'um-%DATE%-success.log'
          ),
          datePattern: 'YYYY-DD-MM-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '1d',
        }),
      ],
    });
  }
}

function createErrorLogger(): winston.Logger {
  if (config.env === 'development') {
    return winston.createLogger({
      level: 'error',
      format: combine(label({ label: 'UM' }), timestamp(), myFormat),
      transports: [new winston.transports.Console()],
    });
  } else {
    return winston.createLogger({
      level: 'error',
      format: combine(label({ label: 'UM' }), timestamp(), myFormat),
      transports: [
        new DailyRotateFile({
          filename: path.join(
            process.cwd(),
            'logs',
            'winston',
            'errors',
            'um-%DATE%-error.log'
          ),
          datePattern: 'YYYY-DD-MM-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }
}

export { logger, errorLogger };

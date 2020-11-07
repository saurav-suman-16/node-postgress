const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');
const config = require('../config');

const enumerateErrorFormat = winston.format(info => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.ENV === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ level, message, timestamp }) => `${timestamp}: ${level} >> ${message}`,
    ),
  ),
  transports: [
    new winstonDailyRotateFile({
      filename: `${config.SERVER_PATH}/logs/error.log`,
      datePattern: 'YYYY-MM-DD',
      level: 'error',
    }),
    new winstonDailyRotateFile({
      filename: `${config.SERVER_PATH}/logs/combined.log`,
      datePattern: 'YYYY-MM-DD',
    }),
    new winston.transports.Console({ level: 'error' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  );
}

module.exports = logger;

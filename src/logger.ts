import { createLogger, transports, format } from 'winston';
import config from './common/config';

const { LOGGER_LEVEL } = config;

const customFormat = format.combine(format.timestamp(), format.printf((info) => `${info.timestamp} - [${info.level.toUpperCase().padEnd(7)}] - ${info.message}`))

const errorLogFileName =  `${new Date().toLocaleDateString()}error.log`;

const formattedLevel = (level?: string): string | undefined => {
  switch (level) {
    case '0':
      return 'error';
    case '1':
      return 'warn';
    case '2':
      return 'info';
    case '3':
      return 'debug';
    case '4':
    default:
      return undefined;
  }
};

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: formattedLevel(LOGGER_LEVEL) }),
    new transports.File({ filename: errorLogFileName, level: formattedLevel(LOGGER_LEVEL) }),
    new transports.File({ filename: 'server.log' }),
  ]
});

export {
  logger,
}

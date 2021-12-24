import { createLogger, transports } from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console({ level: 'debug' }),
    new transports.File({ filename: 'server.log' })
  ]
});

export {
  logger,
}

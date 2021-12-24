import { createLogger, transports, format } from 'winston';

const customFormat = format.combine(format.timestamp(), format.printf((info) => `${info.timestamp} - [${info.level.toUpperCase().padEnd(7)}] - ${info.message}`))

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: 'debug' }),
    new transports.File({ filename: 'server.log' })
  ]
});

export {
  logger,
}

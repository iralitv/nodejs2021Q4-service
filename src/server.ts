import "reflect-metadata";
import { Connection, createConnection, getConnection, getConnectionManager, getConnectionOptions, QueryRunner } from "typeorm";
import { logger } from "./logger";
import config from './common/config';

const app = require('./app');

const { PORT } = config;

createConnection().then(async connection => {
  app.listen(PORT, () =>
  logger.info(`App is running on http://localhost:${PORT}`)
);
}).catch(error => console.log(error));

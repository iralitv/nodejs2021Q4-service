import { logger } from "./logger";
import config from './common/config';

export {};
const app = require('./app');

const { PORT } = config;

app.listen(PORT, () =>
  logger.info(`App is running on http://localhost:${PORT}`)
);

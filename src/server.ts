import http from 'http';
import amqplib from 'amqplib';

import logger from './config/winston';

const PORT = process.env.PORT || 8090;
const NODE_ENV: string = process.env.NODE_ENV || 'development';
const AMQP_SERVER_URL: string = process.env.AMQP_SERVER_URL;

const server: http.Server = http.createServer(() => {

});

server.listen(PORT, () => {
  logger.info(`Logging service running in ${NODE_ENV} mode on port ${PORT}`);
});

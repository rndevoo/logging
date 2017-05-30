/**
 * @overview
 * The microservice's entry point.
 *
 * Here, we listen for messages and log them. Just that.
 * But useful for centralized logging.
 *
 * @author Diego Stratta <strattadb@gmail.com>
 * @license GPL-3.0
 */

import * as amqplib from 'amqplib';

import logger from './config/winston';

import logHandler from './handlers/log';

const RABBITMQ_SERVER_URL = process.env.RABBITMQ_SERVER_URL;

/**
 * @name main
 * @function
 *
 * @description
 * The service main function.
 */
async function main () {
  // First, we need to connect to the AMQP server.
  const conn = await amqplib.connect(RABBITMQ_SERVER_URL);
  logger.info(`Connection to RabbitMQ server at ${RABBITMQ_SERVER_URL} established.`);

  const ch: amqplib.Channel = await conn.createChannel();

  // This is only queue we listen in this service.
  const loggingQueue = 'logging';
  ch.assertQueue(loggingQueue);

  logger.info(`Waiting for messages in queue '${loggingQueue}...'`);

  ch.consume(loggingQueue, logHandler);
}

main();

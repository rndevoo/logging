/**
 * @overview
 * The microservice's entry point.
 *
 * Here, we listen to messages in the logging queue and log them. Just that.
 * But useful for centralized logging.
 *
 * @author Diego Stratta <strattadb@gmail>
 * @license GPL-3.0
 */

import * as dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV;
// Load environmental variables if not running in production.
if (NODE_ENV !== 'production') {
  dotenv.config({ path: '../.env'});
}

import * as amqplib from 'amqplib';

import logger from './config/winston';



const AMQP_SERVER_URL: string = process.env.AMQP_SERVER_URL;

// First, we need to connect to the AMQP server.
amqplib.connect(AMQP_SERVER_URL).then(async (conn) => {
  const ch: amqplib.Channel = await conn.createChannel();

  // This is only queue we listen in this service.
  const loggingQueue = 'logging';
  ch.assertQueue(loggingQueue);

  logger.info(`Waiting for messages in queue '${loggingQueue}...'`);

  ch.consume(loggingQueue, (msg: any) => {
    // It comes as a Buffer.
    const data = JSON.parse(msg.content.toString());

    // Log it away!
    logger.log(data.level, `${data.service}: ${data.message}`);
  });
});

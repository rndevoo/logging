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

import amqplib from 'amqplib';

import logger from './config/winston';

const AMQP_SERVER_URL: string = process.env.AMQP_SERVER_URL;

// First, we need to connect to the AMQP server.
amqplib.connect(AMQP_SERVER_URL).then(async (conn) => {
  const ch: amqplib.Channel = await conn.createChannel();

  // This is only queue we listen in this service.
  const queue = 'logging';

  await ch.assertQueue(queue);

  logger.info(`Waiting for messages in queue '${queue}...'`);
  ch.consume(queue, (msg: any) => {
    // It comes as a Buffer.
    const data = JSON.parse(msg.content.toString());

    // Log it away!
    logger.log(data.level, `${data.service}: ${data.message}`);
  });
});

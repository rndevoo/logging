/**
 * @overview
 * Handler of the logging messaging queue.
 */

import { Message } from 'amqplib';

import logger from '../config/winston';

export default async function log (msg: Message): Promise<void> {
  // The data comes as a Buffer.
  const data = JSON.parse(msg.content.toString());

  // Log it away!
  logger.log(data.level, `${data.service}: ${data.message}`);
}

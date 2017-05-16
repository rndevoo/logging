import winston from 'winston';

const LOG_LEVEL: string = process.env.LOG_LEVEL;

winston.configure({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: LOG_LEVEL,
    }),
  ],
});

export default winston;

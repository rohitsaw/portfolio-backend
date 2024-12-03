import winston from 'winston';
import os from 'os';
import { nanoid } from 'nanoid';
import responseTime from 'response-time';

class Logger {
  #logger: winston.Logger;

  constructor() {
    this.#logger = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ssZ' }),
            winston.format.colorize({ all: true }),
            winston.format.simple()
          ),
        }),
        // new winston.transports.File({
        //   filename: 'logs.log',
        //   format: winston.format.combine(
        //     winston.format.errors({ stack: true }),
        //     winston.format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ssZ' }),
        //     winston.format.json()
        //   ),
        // }),
      ],
      exitOnError: false,
      defaultMeta: {
        service: process.env.npm_package_name,
        systemUser: os.userInfo().username,
        userInfo: JSON.stringify(os.userInfo()),
        uniqueId: nanoid,
      },
    });
  }

  info(message: string) {
    this.#logger.info(message);
  }

  error(message: string) {
    this.#logger.error(message);
  }

  express = responseTime((req, res, time) => {
    let ignoreUrls = ['/health', '/db_health'];
    if (!ignoreUrls.includes(req.originalUrl)) {
      let msg = `${req.method} ${req.originalUrl} ${req.statusCode}`;
      if (time) msg += ` ${Math.round(time)}ms`;
      if (res.statusCode < 400) {
        this.info(msg);
      } else {
        this.error(msg);
      }
    }
  });
}

export default new Logger();

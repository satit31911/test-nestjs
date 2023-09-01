/* eslint-disable prettier/prettier */
import { Injectable, LoggerService } from "@nestjs/common";
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
// const dateNow = new Date().toLocaleDateString();

@Injectable()
export class MyLoggerService implements LoggerService{
	private logger: winston.Logger;

	constructor() {
		this.logger = winston.createLogger({
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf(({ timestamp, level, message }) => {
					return `${timestamp} [${level}] - ${message}`;
				})
			),
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({ filename: 'errors.log', level: 'error'}),
				new winston.transports.File({ filename: 'debug.log', level: 'debug'}),
				new DailyRotateFile({
					filename: 'logs-%DATE%.log',
					datePattern: 'YYYY-MM-DD',
					zippedArchive: false,
					// maxSize: '2k',
					// maxFiles: '1d'
				})
			]
		});
	}

	log(message: string) {
		this.logger.info(message);
	}

	error(message: string, trace: string) {
		this.logger.error(message, trace);
	}

	warn(message: string) {
		this.logger.warn(message);
	}

	debug(message: string) {
		this.logger.debug(message);
	}
}
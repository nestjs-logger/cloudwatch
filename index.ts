import type { LogLevel, LoggerService } from '@nestjs/common';
import dayjs from 'dayjs';
import { CloudWatchLogs } from 'aws-sdk';

export interface Options extends CloudWatchLogs.ClientConfiguration {
	groupName: string;
	streamName: string;
}

export class CloudWatchLogger implements LoggerService {
	protected cloudwatch: CloudWatchLogs;

	constructor(protected options: Options) {
		const { groupName: _, streamName: __, ...cloudwatchOptions } = this.options;

		this.cloudwatch = new CloudWatchLogs(cloudwatchOptions);
	}

	protected serialize(level: LogLevel, message: any, ...optionalParams: any[]) {
		const data = JSON.stringify(
			{
				message,
				optionalParams,
			},
			null,
			'\t'
		);

		return `[${level}][${dayjs().format('YYYY-MM-DD HH:mm:ss')}] ${data}`;
	}

	protected write(level: LogLevel, message: any, ...optionalParams: any[]) {
		this.cloudwatch.putLogEvents(
			{
				logGroupName: this.options.groupName,
				logStreamName: this.options.streamName,
				logEvents: [
					{
						message: this.serialize(level, message, ...optionalParams),
						timestamp: Date.now(),
					},
				],
			},
			(err, _) => {
				if (err) {
					console.error(err);
				}
			}
		);
	}

	log(message: any, ...optionalParams: any[]) {
		this.write('log', message, ...optionalParams);
	}

	error(message: any, ...optionalParams: any[]) {
		this.write('error', message, ...optionalParams);
	}

	warn(message: any, ...optionalParams: any[]) {
		this.write('warn', message, ...optionalParams);
	}

	debug(message: any, ...optionalParams: any[]) {
		this.write('debug', message, ...optionalParams);
	}

	verbose(message: any, ...optionalParams: any[]) {
		this.write('verbose', message, ...optionalParams);
	}

	public static create(options: Options) {
		return new CloudWatchLogger(options);
	}
}

import type { LogLevel, LoggerService } from '@nestjs/common';
import { CloudWatchLogs } from 'aws-sdk';
export interface Options extends CloudWatchLogs.ClientConfiguration {
    groupName: string;
    streamName: string;
}
export declare class CloudWatchLogger implements LoggerService {
    protected options: Options;
    protected cloudwatch: CloudWatchLogs;
    constructor(options: Options);
    protected serialize(level: LogLevel, message: any, ...optionalParams: any[]): string;
    protected write(level: LogLevel, message: any, ...optionalParams: any[]): void;
    log(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    debug(message: any, ...optionalParams: any[]): void;
    verbose(message: any, ...optionalParams: any[]): void;
    static create(options: Options): CloudWatchLogger;
}

import { Logger, LoggerService, LogLevel } from '@nestjs/common';

export class AppLogger extends Logger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    super.error(message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
  }
  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, ...optionalParams);
  }
  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message, ...optionalParams);
  }
  setLogLevels(levels: LogLevel[]) {
    // throw new Error('Method not implemented.');
  }
}

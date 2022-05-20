import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AppLogger extends Logger implements LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) {
    super();
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.log(message);
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
}

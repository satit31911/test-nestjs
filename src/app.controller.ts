/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Patch,
  UseFilters,
  UseInterceptors,
  Body,
  Inject,
  // Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { MyLoggerService } from './logger/logger.service';

@Controller('testAPI')
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(@Inject(MyLoggerService) private readonly logger: MyLoggerService, 
              private readonly appService: AppService) {}

  @Post('stored-procedure')
  async testCreateStoredProcedure(): Promise<any> {
    try {
      return await this.appService.testCreateStoredProcedure();
    } catch (error) {
      return { message: 'Failed to create stored procedure', error: error.message };
    }
  }

  @Patch('stored-procedure')
  @UseFilters(new HttpExceptionFilter())
  async testCreateStoredProcedureBody() {
    return await this.appService.testCreateStoredProcedureBody().catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })
    // try {
    //   return await this.appService.testCreateStoredProcedureBody();
    // } catch (error) {
    //   throw new HttpException({
    //     status: HttpStatus.FORBIDDEN,
    //     error: error,
    //   }, HttpStatus.FORBIDDEN, {
    //     cause: error
    //   });
    // }
  }

  @Get()
  // @Render('index.hbs')
  getHello() {
    const result = this.appService.getHello('inputString');
    return result;
    // return res.render('Hello World!', {result})
  }

  @Get('stored-procedure')
  // @Render('index')
  async testGetStoredProcedure(@Query() query): Promise<any> {
    this.logger.log('This is a log message.');
    this.logger.error('This is an error message.', 'Error Trace');
    this.logger.warn('This is a warning message.');
    this.logger.debug('This is a debug message.');
    const result = await this.appService.testNewCommand(query);
    return result;
  }
  
  @Post('CLOB-stored-procedure')
  async testGetCLOBStoredProcedure(@Body() request: string): Promise<any> {
    return await this.appService.getCLOBData(request);
  }

  @Put('stored-procedure')
  async getTestData(@Query() query): Promise<any> {
    return await this.appService.getTestData(query);
  }
}

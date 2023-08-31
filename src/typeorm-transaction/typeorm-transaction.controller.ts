/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { TypeOrmTransactionService } from './typeorm-transaction.service';
import { TypeOrmTransaction } from './typeorm-transaction.entity';

@Controller('transactions')
export class TypeOrmTransactionController {
  constructor(private readonly typeOrmTransactionService: TypeOrmTransactionService) {}

  @Get()
  async getAllTransactions(): Promise<TypeOrmTransaction[]> {
    return this.typeOrmTransactionService.getAllTransactions();
  }

  @Get('typeOrm')
  async getExecuteTypeOrmQuery(@Query() query): Promise<any> {
    return this.typeOrmTransactionService.testExecuteTypeOrmQuery(query.inputString);
  }
}
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TypeOrmTransaction } from './typeorm-transaction.entity';
import { TypeOrmTransactionRepository } from './typeorm-transaction.repository';

@Injectable()
export class TypeOrmTransactionService {
  constructor(
    private readonly typeOrmTransactionRepository: TypeOrmTransactionRepository
  ) {}

  async getAllTransactions(): Promise<TypeOrmTransaction[]> {
    return await this.typeOrmTransactionRepository.getAllTransactions();
  }

  async testExecuteTypeOrmQuery(inputString: string): Promise<any> {
    const sql = 'SELECT * FROM VASAPPS.ACTIVITY_LOG';
    console.log('inputString : ', inputString)
    // const sqlForMulti = `BEGIN
    //                           PCR_FRAMEWORK_POC.PRR_TEST_OUT_MULTI_VALUE(:P_IN_STR, :P_OUT_STS, :P_OUT_MSG);
    //                      END;`;
    // const bindVariableForMulti = [
    //   { name: 'P_IN_STR', dir: 'IN', value: inputString },
    //   { name: 'P_OUT_STS', dir: 'OUT', type: 'STRING', maxSize: 50 },
    //   { name: 'P_OUT_MSG', dir: 'OUT', type: 'STRING', maxSize: 200 },
    // ];
    return await this.typeOrmTransactionRepository.executeTypeOrmQuery(sql)
  }
}
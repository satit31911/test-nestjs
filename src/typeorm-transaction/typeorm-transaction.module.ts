/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTransaction } from './typeorm-transaction.entity';
import { TypeOrmTransactionController } from './typeorm-transaction.controller';
import { TypeOrmTransactionService } from './typeorm-transaction.service';
import { TypeOrmTransactionRepository } from './typeorm-transaction.repository';

@Module({
	imports: [TypeOrmModule.forFeature([TypeOrmTransaction])],
	controllers: [TypeOrmTransactionController],
	providers: [TypeOrmTransactionService, TypeOrmTransactionRepository],
})
export class TypeOrmTransactionModule {}
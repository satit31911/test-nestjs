/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
// import { getDbConnection } from '../oracledb.connection';
import { TypeOrmTransaction } from './typeorm-transaction.entity';

@Injectable()
export class TypeOrmTransactionRepository {
	constructor(
    @InjectRepository(TypeOrmTransaction)
    private typeOrmTransactionRepository: Repository<TypeOrmTransaction>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}
	async getAllTransactions() {
		return this.typeOrmTransactionRepository.find();
	}

	async executeTypeOrmQuery(sql: string) {
		const connection = this.entityManager.connection;
		return await connection.query(sql);
	}
}

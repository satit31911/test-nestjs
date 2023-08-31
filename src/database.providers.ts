/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { TypeOrmTransaction } from './typeorm-transaction/typeorm-transaction.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'oracle',
        host: '10.2.2.231',
        port: 1521,
        username: 'vasapps',
        password: 'B33kDNpT3aW9Db#h',
        database: 'THDDOL10',
        entities: [TypeOrmTransaction],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
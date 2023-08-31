import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TransactionModule } from './transaction/transaction.module';
import { AppRepository } from './app.repository';
import { RawTextPipe } from './pipe/raw-text.pipe';
import { XmlModule } from './modules/xml/xml.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTransactionModule } from './typeorm-transaction/typeorm-transaction.module';
import { MyLoggerService } from './logger/logger.service';
import { TypeOrmTransaction } from './typeorm-transaction/typeorm-transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: '10.2.2.231',
      port: 1521,
      username: 'vasapps',
      password: 'B33kDNpT3aW9Db#h',
      sid: 'THDDOL10',
      entities: [TypeOrmTransaction, __dirname + 'dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmTransactionModule,
    XmlModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository, RawTextPipe, MyLoggerService],
  exports: [MyLoggerService],
})
export class AppModule {}

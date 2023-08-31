/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { XmlController } from './xml.controller';
import { XmlService } from './xml.service';

@Module({
	imports: [
		MulterModule.register({
			dest: './uploads',
		}),
	],
	controllers: [XmlController],
	providers: [XmlService],
})
export class XmlModule {}
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { XmlService } from './xml.service';

@Controller('xml')
export class XmlController {
	constructor(private readonly xmlService: XmlService) {}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file): Promise<any[]> {
		const filePath = file.path;
		const data = await this.xmlService.readExcel(filePath);
		return data;
	}
}
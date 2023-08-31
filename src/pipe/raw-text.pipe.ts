/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class RawTextPipe implements PipeTransform<string, string> {
	transform(value: string, metadata: ArgumentMetadata): string {
		return value;
	}
}
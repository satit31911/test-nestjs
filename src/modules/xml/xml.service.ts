/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import * as fs from 'fs/promises';
import * as exceljs from 'exceljs';

@Injectable()
export class XmlService {
	async readExcel(filePath: string): Promise<any[]> {
		const workbook = new exceljs.Workbook();
		await workbook.xlsx.readFile(filePath); // read excel data
		const worksheetCount = workbook.worksheets.length;
		const result = [];
		for (let i = 1; i <= worksheetCount; i++) {
			const worksheet = workbook.getWorksheet(i); // get specific worksheet
			const firstRow = worksheet.views && worksheet.views[0] && worksheet.views[0].state === 'frozen' ? worksheet.views[0].ySplit + 1 : 1; // get only unfreeze rows
			const rows = [];
			for (let rowNumber = firstRow; rowNumber <= worksheet.rowCount; rowNumber++) {
				//loop map data by row
				const row = worksheet.getRow(rowNumber);
				const rowData = [];
				row.eachCell({ includeEmpty: true }, (cell) => {
					if (cell.value !== null) {
						rowData.push(cell.value);
					}
				});
				// map only not null data
				if (rowData.length > 0){
					rows.push(rowData);
				}
			}
			// map data for each sheet
			const sheetData = {
				sheetName: worksheet.name,
				data: rows
			}
			result.push(sheetData); // push data by sheet
		}
		await fs.unlink(filePath); // delete uploaded file
		return result;
	}
}
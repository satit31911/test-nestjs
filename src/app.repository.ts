/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { getDbConnection } from './oracledb.connection';
const oracledb = require('oracledb');
// const dbConfig = { user: 'vasapps', password: 'B33kDNpT3aW9Db#h', connectionString: '10.2.2.231:1521/THDDOL10' };

@Injectable()
export class AppRepository {
	async executeSql(sql: string) {
		const connection = await getDbConnection();
		try{
			const result = await connection.execute(sql);
			await connection.commit();
			return result;
		} catch (error) {
			await connection.rollback();
			console.error(error);
		} finally {
			connection.close();
		}
	}
	async executeSqlWithBindVariable(sql: string, bindVariable: any) {
		const connection = await getDbConnection();
		try{
			const result = await connection.execute(sql, bindVariable);
			await connection.commit();
			return result;
		} catch (error) {
			console.error(error);
		} finally {
			if (connection) {
				try {
					connection.close();
				} catch (error) {
					console.error(error);
				}
			}
		}
	}

	async testExecuteNewCommand(inputString: string) {
		const connection = await getDbConnection();
		const bindVariableForMulti = {
			P_IN_STR: {dir: oracledb.BIND_IN, type: oracledb.STRING, val: inputString},
			P_OUT_STS: {dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100},
			P_OUT_MSG: {dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 100}
		};
		const sqlForMulti = `BEGIN
					 		PCR_FRAMEWORK_POC.PRR_TEST_OUT_MULTI_VALUE(:P_IN_STR, :P_OUT_STS, :P_OUT_MSG);
					 END;`;
		const bindVariableForCursor = {
			P_IN_STR: {dir: oracledb.BIND_IN, type: oracledb.STRING, val: inputString},
			P_OUT_CURSOR: {dir: oracledb.BIND_OUT, type: oracledb.CURSOR}
		};
		const sqlForCursor = `BEGIN
									PCR_FRAMEWORK_POC.PRR_TEST_OUT_CURSOR(:P_IN_STR, :P_OUT_CURSOR);
							  END;`;
		try {
			const resultMulti = await connection.execute(sqlForMulti, bindVariableForMulti);
			const resultCursor = await connection.execute(sqlForCursor, bindVariableForCursor);
			const outputResultMulti = resultMulti.outBinds.P_OUT_MSG + " : " + resultMulti.outBinds.P_OUT_STS;
			const outputResultCursor = resultCursor.outBinds.P_OUT_CURSOR;
			const cursorResponse = await outputResultCursor.getRows();
			console.log('output cursor count => ', cursorResponse.length , ' records')
			const response = {
				multi: outputResultMulti,
				cursor: cursorResponse
			}
			return response;
		}	catch(error) {
				console.error(error)
			throw error;
		} finally {
				if (connection) {
				try {
					await connection.close();
				} catch(error) {
					console.error(error);
				}
			}
		}
	}

	async GetClobData(clobData: any) {
		const connection = await getDbConnection();
		const bindVariable = {
			P_I_JSON: {dir: oracledb.BIND_IN, type: oracledb.CLOB, val: clobData},
			P_OUT_USERID: {dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 10}
		}
		const sql = `BEGIN
						PCR_FRAMEWORK_POC.PRR_TEST_OUT_CURSOR(:P_I_JSON, :P_OUT_USERID);
					 END;`
		try {
			const result = await connection.execute(sql, bindVariable);
			console.log('result : ', result);
			return result.outBinds.P_OUT_USERID;
		} catch (err) {
			console.error("Error : ", err);
		} finally {
			if (connection) {
				try {
					await connection.close();
				} catch (err) {
					console.error('Error closing connection : ', err)
				}
			}
		}
	}
}

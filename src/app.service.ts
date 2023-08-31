/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { BKG_SIZE_TYPE_DTL_DTO } from 'src/DTO/BKG_SIZE_TYPE_DTL.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AppRepository } from './app.repository';
const oracledb = require('oracledb');

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository){}
  getHello(inputString: string) {
    return `test return input string = ${inputString}`;
  }
  async getTestData(dataLimit: any) {
    let connection;
    let result;
    // const sql = `SELECT FK_LINE, FK_AGENT FROM RCLTBLS.BKG_SIZE_TYPE_DTL WHERE FK_AGENT = 'BKK' ORDER BY FK_AGENT FETCH FIRST ${dataLimit.limit} ROWS ONLY`;
    const sql = `CREATE OR REPLACE PACKAGE BODY "PCR_FRAMEWORK_POC" AS 
                      PROCEDURE prr_TEST_OUT_VALUE(P_IN_STR varchar2 DEFAULT NULL,
                                      P_OUT_STR OUT varchar2) AS 
                      BEGIN
                        P_OUT_STR := 'POC NESTJS FRAMEWORK';
                      EXCEPTION
                        WHEN OTHERS THEN
                        VASAPPS.PCR_RCM_RECORD_LOG.PRR_RECORD_LOG('PCR_FRAMEWORK_POC',
                                              'PONPIC1',
                                              'PRR_TEST_OUT_VALUE');
                      END	PRR_TET_OUT_VALUE;
                    END PCR_FRAMEWORK_POC;`;
    try {
      connection = await oracledb.getConnection({
        user: 'rcltbls',
        password: 'JnJ9SAusz8kFd2#V',
        connectString: '10.2.2.231:1521/THDDOL10',
      });
      result = await connection.execute(sql);
      console.log('result: ', result);
      return result;
    } catch (err) {
      return 'failed';
    }
    // try {
    //   connection = oracledb.getConnection({
    //     user: 'rcltbls',
    //     password: 'JnJ9SAusz8kFd2#V',
    //     connectString: '10.2.2.231:1521/THDDOL10',
    //   });
    //   console.log('connected to database');
    //   result = connection.execute(`SELECT * RCLTBLS.BKG_SIZE_TYPE_DTL`);
    //   return result;
    // } catch (err) {
    //   return res.send(err.message);
    // } finally {
    //   if (connection) {
    //     try {
    //       connection.close();
    //       console.log('close connection success');
    //     } catch (err) {
    //       console.error(err.message);
    //     }
    //   }
    //   if (result.rows.length == 0) {
    //     //query return zero employees
    //     return res.send('query send no rows');
    //   } else {
    //     //send all employees
    //     return res.send(result.rows);
    //   }
    // }
  }
  // post
  async testCreateStoredProcedure() {
    // let connection;
    // let result;
    const sql = `CREATE OR REPLACE PACKAGE BODY PCR_FRAMEWORK_POC IS
                    PROCEDURE PRR_TEST_OUT_VALUE(P_IN_STR IN varchar2,
                                                P_OUT_STR OUT varchar2) IS
                    BEGIN
                      P_OUT_STR := ('POC NESTJS FRAMEWORK ' || TO_CHAR(P_IN_STR));
                    END	PRR_TEST_OUT_VALUE;
                  END  PCR_FRAMEWORK_POC;`;
    try {
      // connection = await oracledb.getConnection({
      //   user: 'rcltbls',
      //   password: 'JnJ9SAusz8kFd2#V',
      //   connectString: '10.2.2.231:1521/THDDOL10',
      // });
      // console.log('sql : ', sql);
      // result = await connection.execute(sql);
      // console.log('@POST result => ', result);
      // await connection.close();
      // return 'create stored procedure success, result => ' + result;
      return await this.appRepository.executeSql(sql);
    } catch (err) {
      return 'create failed';
    }
  }
  // patch
  async testCreateStoredProcedureBody() {
    const sql = `CREATE OR REPLACE PACKAGE BODY PCR_FRAMEWORK_POC IS
                   PROCEDURE PRR_TEST_OUT_VALUE(P_IN_STR IN varchar2,
                                                P_OUT_STR OUT varchar2) IS
                   BEGIN
                      P_OUT_STR := ('POC NESTJS FRAMEWORK ' || TO_CHAR(P_IN_STR));
                   END	PRR_TEST_OUT_VALUE;
                 END  PCR_FRAMEWORK_POC;`;
    try {
      // const connection = await oracledb.getConnection({
      //   user: 'rcltbls',
      //   password: 'JnJ9SAusz8kFd2#V',
      //   connectString: '10.2.2.231:1521/THDDOL10',
      // });
      // console.log('sql : ', sql);
      // const result = await connection.execute(sql);
      // console.log('@PATCH result => ', result);
      // await connection.close();
      // return 'create stored procedure body success, result => ' + result;
      return await this.appRepository.executeSql(sql);
    } catch (err) {
      console.error(err)
      // throw new HttpException({
      //   status: HttpStatus.FORBIDDEN,
      //   error: err,
      // }, HttpStatus.FORBIDDEN, {
      //   cause: err
      // });
    }
  }
  // get
  async testGetStoredProcedure(query: any) {
    let connection;
    let result;
    const sql = `DECLARE
                    P_IN_STR VARCHAR2(100) := '${query.inputString}';
                    dataResult VARCHAR(100);
                 BEGIN
                    PCR_FRAMEWORK_POC.PRR_TEST_OUT_VALUE(P_IN_STR, dataResult);
                    :outputResult := dataResult;
                 END;`;
    const bindVariable = {
      outputResult: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };
    try {
      // connection = await oracledb.getConnection({
      //   user: 'rcltbls',
      //   password: 'JnJ9SAusz8kFd2#V',
      //   connectString: '10.2.2.231:1521/THDDOL10',
      // });
      // console.log('sql : ', sql);
      // result = await connection.execute(sql, bindVariable);
      // console.log('@GET result : ', result.outBinds.outputResult);
      // await connection.close();
      // return 'get stored procedure success, result => ' + result.outBinds.outputResult;
      return this.appRepository.executeSqlWithBindVariable(sql, bindVariable);
    } catch (err) {
      return 'get procedure failed';
    }
  }

  async testNewCommand(query: any) {
    const inputString: string = query.inputString;
    let result;
    try {
      return await this.appRepository.testExecuteNewCommand(inputString);
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

  async getCLOBData(body: any) {
    try {
      return await this.appRepository.GetClobData(body);
    } catch(error) {
      console.error(error);
      throw error;
    }
  }
}

/* eslint-disable prettier/prettier */
import oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
export const getDbConnection = async () => {
  return await oracledb.getConnection({
    user: "vasapps",
    password: "B33kDNpT3aW9Db#h",
    connectString: "10.2.2.231:1521/THDDOL10"
  })
};
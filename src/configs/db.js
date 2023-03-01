import * as dotenv from 'dotenv';
import oracledb from 'oracledb';
import knex from 'knex';
dotenv.config();
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: 'C:\\instantclient_21_9' });

export const conn = knex({
  client: 'oracledb',
  connection: {
    user: process.env.NODE_ORACLEDB_USER,
    password: process.env.NODE_ORACLEDB_PASSWORD,
    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
  },
})
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const LOCALHOST_PORT = process.env.PORT;

const {Pool} = pkg;

export const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port:  parseInt(process.env.PG_PORT, 10),
    max: 10,
    connectionTimeoutMillis: 20000,
    idleTimeoutMillis: 20000,
    allowExitOnIdle: false,
  });


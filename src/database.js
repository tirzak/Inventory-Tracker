
import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config()

 const db = new Pool({
    host: process.env.DB_HOST,//Gets details from .env file
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    
});
export {db}

import pgsql from 'pg';

const pool=pgsql.Pool
let connection
export const db = {
    
    connect: () => {//connections
        connection = new pool({
            host: process.env.DB_HOST,//Gets details from .env file
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            
        })
        connection.connect();
    },
    query: (queryString, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolve({ results, fields });
            })
        }),
    end: () => connection.end(),
}
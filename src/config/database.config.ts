/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
 */

import sql from 'mssql';
import { CONFIG } from '../shared';

const poolPromise = new sql.ConnectionPool(CONFIG)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed! Bad Config: ', err);
        throw err;
    });
export const conn = async() =>{
    try {
        const connection = await poolPromise;
        return connection;
    } catch (error:any) {
        console.log(`Database Connection Error ${error}`);
    }
}
export default { sql, poolPromise };
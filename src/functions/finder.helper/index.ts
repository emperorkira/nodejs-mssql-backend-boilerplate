/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import sql from 'mssql'; import crypto from 'crypto'; import jwt from 'jsonwebtoken'; 
import { Get } from '../../models';
//import { tbl, QUERY,  token, default_records, audittrail_fields} from '../shared'; 
//import { audittrail_schema } from '../schemas/index.js';

export class Finder {

    /**
     * Check if the record already exists
     * @param {string} Table - The name of the table
     * @param {Array<string>} Field - The array of field names
     * @param {Array<string>} Type - The array of SQL data types corresponding to the fields
     * @param {Array<any>} Data - The array of data values corresponding to the fields
     * @returns {Promise<boolean>} - Returns true if the record exists, otherwise false
    */
    static isFound = async (Table: string = '', Field: Array<string> = [], Type: Array<any> = [], Data: Array<any> = []): Promise<boolean> => {
        let flag = false;
        try {
            if (!Table || typeof Table !== 'string' ) return flag;
            if (!Field.every(field => field !== undefined)) return flag;
            if (!Type.every(field => field !== undefined)) return flag;
            if (!Data.every(field => field !== undefined)) return flag;
            if (!Field || !Type || !Data || Field.length !== Type.length || Field.length !== Data.length) return flag;
            const conditions = Field.map((field, index) => `${field} = @${field}`).join(' AND ');
            const check = await Get.recordByFields(`SELECT 1 FROM [dbo].[${Table}] WHERE ${conditions}`, Field, Type, Data);
            if (check && check.length > 0) flag = true;
        } catch (error:any) {
            console.log('Error in isFound function:', error.message); 
        }
        return flag;
    }; // END HERE

    /**
     * Check if the records already exists
     * @param {string} Query - The name of the table
     * @param {Array<string>} Field - The array of field names
     * @param {Array<string>} Type - The array of SQL data types corresponding to the fields
     * @param {Array<any>} Data - The array of data values corresponding to the fields
     * @returns {Promise<boolean>} - Returns true if the record exists, otherwise false
     */
    static findByField = async(Query: string = '', Field: Array<any> = [], Type: Array<any> = [], Data: Array<any> = []): Promise<boolean> => {
        let flag = false;
        try {
            if (!Query || typeof Query !== 'string' ) return flag;
            if (!Field.every(field => field !== undefined)) return flag;
            if (!Type.every(field => field !== undefined)) return flag;
            if (!Data.every(field => field !== undefined)) return flag;
            if (!Field || !Type || !Data || Field.length !== Type.length || Field.length !== Data.length) return flag;
            const check = await Get.recordByFields(Query, Field, Type, Data);
            if (check && check.length > 0) flag = true;
        } catch (error:any) {
            console.log('Error in isFound function:', error.message);
        }
        return flag;
    }; // END HERE
}
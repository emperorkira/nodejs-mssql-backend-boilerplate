/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import sql from 'mssql'; import crypto from 'crypto'; import jwt from 'jsonwebtoken'; 
import Get from '../models/getModel';
//import { tbl, QUERY,  token, default_records, audittrail_fields} from '../shared'; 
//import { audittrail_schema } from '../schemas/index.js';

class Finder {

    /**
     * Check if the record already exists
     * @param {string} Table - The name of the table
     * @param {Array<string>} Field - The array of field names
     * @param {Array<string>} Type - The array of SQL data types corresponding to the fields
     * @param {Array<any>} Data - The array of data values corresponding to the fields
     * @returns {Promise<boolean>} - Returns true if the record exists, otherwise false
    */
    async isFound (Table: string = '', Field: Array<string> = [], Type: Array<string> = [], Data: Array<any> = []): Promise<boolean> {
        let flag = false;
        try {
            if (!Table || !Field || !Type || !Data || Field.length !== Type.length || Field.length !== Data.length) return flag;
            const conditions = Field.map((field, index) => `${field} = @${field}`).join(' AND ');
            const check = await Get.recordByFields(`SELECT 1 FROM [dbo].[${Table}] WHERE ${conditions}`, Field, Type, Data);
            if (check && check.length > 0) flag = true;
            return flag;
        } catch (error:any) {
            console.log('Error in isFound function:', error.message);
            return flag;
        }
    }; // END HERE

    /**
     * Check if the records already exists
     * @param {string} Query - The name of the table
     * @param {Array<string>} Field - The array of field names
     * @param {Array<string>} Type - The array of SQL data types corresponding to the fields
     * @param {Array<any>} Data - The array of data values corresponding to the fields
     * @returns {Promise<boolean>} - Returns true if the record exists, otherwise false
     */
    export const find_by_fields = async (Query: string = '', Field: Array<string> = [], Type: Array<string> = [], Data: Array<any> = []): Promise<boolean> => {
        let flag = false;
        try {
            if (!Query || !Field || !Type || !Data || Field.length !== Type.length || Field.length !== Data.length) return flag;
            const check = await GET.record_by_fields(Query, Field, Type, Data);
            if (check && check.length > 0) flag = true;
            return flag;
        } catch (error) {
            console.log('Error in isFound function:', error.message);
            return flag;
        }
    }; // END HERE
    
    /**
     * Check if the actionId is in the permissions
     * @param {number} UserId 
     * @param {string} Action 
     * @returns {Promise<boolean>} - Returns true if the action is found in permissions
     */
       export const isPermission = async (UserId: number = 0, Action: string = ''): Promise<boolean> => {
        try {
            if (!Action || !UserId) return false;
            const hasPermission = await find_by_fields(QUERY.q00x000, ['UserId','Action'], [Int, NVarChar(50)], [UserId, Action]);
            return hasPermission;
        } catch (error) {
            console.log('Error in isPermission function:', error.message);
            return false;
        }
    };  // END HERE
}
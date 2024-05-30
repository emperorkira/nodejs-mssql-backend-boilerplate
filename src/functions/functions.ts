/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import sql,{ Int, NVarChar, DateTime }  from 'mssql'; 
import crypto from 'crypto'; 
import jwt from 'jsonwebtoken'; 
import { Get, Add } from '../models/'
import { token, DEFAULT, AuditTrailField,  } from '../shared';
import { TABLE, QUERY } from '../shared/index.js'; 
import { AccessRightSchema, AuditTrailSchema } from '../schemas/index.js';

/**
 * Get an existing user
 * @param {String} Username - Username of a user
 * @returns {Promise<JSON>} - returns a data of a user
*/
export const getUserByUsername = async (Username: string = ''): Promise<any> => {
    try{
        if (!Username) return [];
        const user = await Get.recordByFields(QUERY.q014x002, ['Username'], [NVarChar(255)], [Username]);
        return user;
    }catch(error){
        console.log('Error Functions getUserByUsername');
        return [];
    }
}; // END HERE

/**
 * Logs the actions of a user
 * @param {number} UserId - Existing UserId
 * @param {String} Action - Action executed of the user
 * @param {String} Record - Record the user used
 * @param {String} Table - Database table
 * @returns {Promise<String>} - returns true or flase
 * audit trail is where the transaction of each table refers to
 * audit trail cannot be deleted
*/
export const logUserAction = async (UserId: number = 0, Action: string = '', Record: number = 0, Table: string = ''): Promise<boolean> => {
    try {
        if (!UserId || !Action || !Record || !Table ) return false;
        const DateCreated = new Date().toISOString();
        const { error } = AuditTrailSchema.validate({UserId, Action, Record, Table, DateCreated});
        if (error) return false;
        const log = await Add.record(TABLE.t003, AuditTrailField, [Int, NVarChar(50), Int, NVarChar(50), DateTime], [UserId, Action, Record, Table, DateCreated]);
        return log;
    } catch(error) {
        console.log('Error Functions logUserAction');
        return false;
    }
}; // END HERE




/**
 * Decrypts an encrypted password
 * @param {String} hashedPassword - Store encrypted password
 * @returns {Promise<Boolean>} - returns a string of decrypted password
 */
export const hashPassword = async (Password = ''): Promise<string> => {
    try {
        if (!Password) return 'null';
        const algorithm = "aes-256-cbc";
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv( algorithm, Buffer.from(token.ENCRYPTION, "hex"), iv );
        let encryptedPassword = cipher.update(Password, "utf8", "hex");
        encryptedPassword += cipher.final("hex");
        return iv.toString("hex") + encryptedPassword;
    } catch(error) {
        console.log('Error Functions hashPassword');
        return 'null';
    }
}; // END HERE

/**
 * Decrypts an encrypted password
 * @param {String} hashedPassword - Store encrypted password
 * @returns {Promise<Boolean>} - returns a string of decrypted password
 */
export const decryptPassword = async (encryptedPassword = ''): Promise<string> => {
    try {
        if (!encryptedPassword) return 'null';
        const iv = Buffer.from(encryptedPassword.slice(0, 32), "hex");
        const encryptedData = encryptedPassword.slice(32);
        const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(token.ENCRYPTION, "hex"), iv);
        let decryptedPassword = decipher.update(encryptedData, "hex", "utf8");
        decryptedPassword += decipher.final("utf8");
        return decryptedPassword;
    } catch (error:any) {
        console.log('Error in decryptPassword function:', error.message);
        return 'null';
    }
};  // END HERE

/**
 * Compares two password if it matches
 * @param {String} Password - Inputted password
 * @param {String} hashedPassword - Store encrypted password
 * @returns {Promise<Boolean>} - returns true or false
 */
export const comparePassword = async (Password: string = '', hashedPassword: string = ''): Promise<boolean> => {
    try {
        if (!Password || !hashedPassword) {
        console.log('Either password or hashed password is missing');
        return false;
        }
        const decrypted = await decryptPassword(hashedPassword);
        console.log(decrypted);
        return (Password === decrypted);
    } catch (error:any) {
        console.log('Error in comparePassword function:', error.message);
        return false;
    }
};  // END HERE

/**
 * Generate a 6 number code
 * @param {String} Table - Database table
 * @returns {Promise<String>} - returns a string of 6 digit latest code of a table
 */
export const generateCode = async (Table: string = ''): Promise<string> => {
    try {
        if (!Table) {
        console.log('Table is missing'); return ''
        }
        const latest = await Get.recordByQuery(`SELECT MAX([Code]) AS Code FROM [dbo].[${Table}]`);
        const code = String(parseInt(latest[0].Code || 0, 10) + 1).padStart( 6, "0" );
        return code;
    } catch (error:any) {
        console.log('Error in generateCode function:', error.message);
        return '';
    }
};  // END HERE

/**
 * Check if the record already exists
 * @param {string} Table - The name of the table
 * @param {Array<string>} Field - The array of field names
 * @param {Array<string>} Type - The array of SQL data types corresponding to the fields
 * @param {Array<any>} Data - The array of data values corresponding to the fields
 * @returns {Promise<boolean>} - Returns true if the record exists, otherwise false
 */
export const isFound = async (Table: string = '', Field: Array<string> = [], Type: Array<string> = [], Data: Array<any> = []): Promise<boolean> => {
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
export const findByFields = async (Query: string = '', Field: Array<string> = [], Type: Array<any> = [], Data: Array<any> = []): Promise<boolean> => {
    let flag = false;
    try {
        if (!Query || !Field || !Type || !Data || Field.length !== Type.length || Field.length !== Data.length) return flag;
        const check = await Get.recordByFields(Query, Field, Type, Data);
        if (check && check.length > 0) flag = true;
        return flag;
    } catch (error:any) {
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
        const hasPermission = await findByFields(QUERY.q00x000, ['UserId','Action'], [Int, NVarChar(50)], [UserId, Action]);
        return hasPermission;
    } catch (error:any) {
        console.log('Error in isPermission function:', error.message);
        return false;
    }
};  // END HERE

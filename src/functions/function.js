

import sql from 'mssql'; import crypto from 'crypto'; import jwt from 'jsonwebtoken'; 
import { GET, ADD } from '../models/index.js'
import { token, default_records, audittrail_fields } from '../type/index.js';
import { tbl, QUERY } from '../shared/index.js'; 
import { audittrail_schema } from '../schemas/index.js';

    const { Int, NVarChar, DateTime } = sql;

    /**
     * Get an existing user
     * @param {String} Username - Username of a user
     * @returns {Promise<JSON>} - returns a data of a user
    */
    export const getUserByUsername = async (Username = '') => {
        try{
            if (!Username) return null;
            const user = await GET.record_by_fields(QUERY.q014x002, ['Username'], [NVarChar(255)], [Username]);
            return user;
        }catch(error){
            console.log('Error Functions getUserByUsername');
            return null;
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
    export const logUserAction = async (UserId = 0, Action = '', Record = 0, Table = '') => {
        try {
            if (!UserId || !Action || !Record || !Table ) return false;
            const DateCreated = new Date.toISOString();
            const { error } = audittrail_schema.validate({UserId, Action, Record, Table, DateCreated});
            if (error) return false;
            const log = await ADD.record(tbl.t003, audittrail_fields, [Int, NVarChar(50), Int, NVarChar(50), DateTime], [UserId, Action, Record, Table, DateCreated]);
            return log;
        } catch(error) {
            console.log('Error Functions logUserAction');
            return false;
        }
    }; // END HERE

    /**
     * Check if the record is default
     * @param {number} Id - Record Id
     * @param {String} Table - Database table
     * @returns {Promise<String>} - returns true or flase
    */
    export const isDefaultRecord = async (Id = 0, Table = '') => {
        let flag = false;
        try {
            if (!Id || !Table) return flag; Id = parseInt(Id, 10); 
            if (default_records[Table] && default_records[Table].includes(Id)) flag = true;
            return flag;
        } catch(error) {
            console.log('Error Functions getUserByUsername');
            return flag;
        }
    };  // END HERE

     /**
     * Creates a new token
     * @param {number} User - User Id
     * @returns {Promise<String>} - returns a string of encrypted token
     */
    export const getUserPermissions = async (Id = 0) => {
        try {
            if (!Id) return null;
            const userExists = await GET.record_by_id(Id, tbl.t010);
            if (!userExists) return null;
            const permissions = await GET.record_by_fields(QUERY.q010x001, ['RoleId'], [Int], [Id]);
            return permissions;
        } catch (error) {
            console.error('Error in getUserPermissions:', error);
            return null;
        }
    }; // END HERE
    
     /**
     * Creates a new token
     * @param {number} User - User Id
     * @returns {Promise<String>} - returns a string of encrypted token
     */
    export const generateToken = async (user = 0) => {
        try {
            if (!user) return null;
            return jwt.sign({ user }, token.SECRET, { expiresIn: "30m" });
        } catch(error) {
            console.log(' Error Functions generateToken');
            return null;
        }
    }

     /**
     * Creates a new token
     * @param {number} User - User Id
     * @returns {Promise<String>} - returns a string of encrypted token
     */
    export const generateRefreshToken = async (user = 0) => {
        try {
            if (!user) return null;
            return jwt.sign({ user }, token.REFRESH, { expiresIn: "8h" });
        } catch(error) {
            console.log('Error Functions generateRefreshToken');
            return null;
        }
    }

    /**
     * Decrypts an encrypted password
     * @param {String} hashedPassword - Store encrypted password
     * @returns {Promise<Boolean>} - returns a string of decrypted password
     */
    export const hashPassword = async (Password = '') => {
        try {
            if (!Password) return null;
            const algorithm = "aes-256-cbc";
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv( algorithm, Buffer.from(token.ENCRYPTION, "hex"), iv );
            let encryptedPassword = cipher.update(Password, "utf8", "hex");
            encryptedPassword += cipher.final("hex");
            return iv.toString("hex") + encryptedPassword;
        } catch(error) {
            console.log('Error Functions hashPassword');
            return null;
        }
    }; // END HERE
    
    /**
     * Decrypts an encrypted password
     * @param {String} hashedPassword - Store encrypted password
     * @returns {Promise<Boolean>} - returns a string of decrypted password
     */
    export const decryptPassword = async (encryptedPassword = '') => {
        try {
          if (!encryptedPassword) return null;
          const iv = Buffer.from(encryptedPassword.slice(0, 32), "hex");
          const encryptedData = encryptedPassword.slice(32);
          const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(token.ENCRYPTION, "hex"), iv);
          let decryptedPassword = decipher.update(encryptedData, "hex", "utf8");
          decryptedPassword += decipher.final("utf8");
          return decryptedPassword;
        } catch (error) {
          console.log('Error in decryptPassword function:', error.message);
          return null;
        }
    };  // END HERE

    /**
     * Compares two password if it matches
     * @param {String} Password - Inputted password
     * @param {String} hashedPassword - Store encrypted password
     * @returns {Promise<Boolean>} - returns true or false
     */
    export const comparePassword = async (Password = '', hashedPassword = '') => {
        try {
          if (!Password || !hashedPassword) {
            console.log('Either password or hashed password is missing');
            return false;
          }
          const decrypted = await decryptPassword(hashedPassword);
          console.log(decrypted);
          return Password === decrypted;
        } catch (error) {
          console.log('Error in comparePassword function:', error.message);
          return false;
        }
    };  // END HERE

    /**
     * Generate a 6 number code
     * @param {String} Table - Database table
     * @returns {Promise<String>} - returns a string of 6 digit latest code of a table
     */
    export const generateCode = async (Table = '') => {
        try {
          if (!Table) {
            console.log('Table is missing');
            return null;
          }
          const latest = await GET.record_by_query(`SELECT MAX([Code]) AS Code FROM [dbo].[${Table}]`);
          const code = String(parseInt(latest[0].Code || 0, 10) + 1).padStart( 6, "0" );
          return code || null;
        } catch (error) {
          console.log('Error in generateCode function:', error.message);
          return null;
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
    export const isFound = async (Table = '', Field = [], Type = [], Data = []) => {
        let flag = false;
        try {
            if (!Table || !Field || !Type || !Data || Field.length !== Type.length || Field.length !== Data.length) return flag;
            const conditions = Field.map((field, index) => `${field} = @${field}`).join(' AND ');
            const check = await GET.record_by_fields(`SELECT 1 FROM [dbo].[${Table}] WHERE ${conditions}`, Field, Type, Data);
            if (check && check.length > 0) flag = true;
            return flag;
        } catch (error) {
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
    export const find_by_fields = async (Query = '', Field = [], Type = [], Data = []) => {
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
       export const isPermission = async (UserId = 0, Action = '') => {
        try {
            if (!Action || !UserId) return false;
            const hasPermission = await find_by_fields(QUERY.q00x000, ['UserId','Action'], [Int, NVarChar(50)], [UserId, Action]);
            return hasPermission;
        } catch (error) {
            console.log('Error in isPermission function:', error.message);
            return false;
        }
    };  // END HERE
    /*
    (async()=> {
        try {
            const permissions = await isDefaultRecord(1, 'User');
            console.log(permissions);
        } catch (error) {
            console.log(error)
        }

    })();*/
    
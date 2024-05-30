/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import sql from 'mssql'; import crypto from 'crypto'; import jwt from 'jsonwebtoken'; 
import { Get } from '../../models/';
import { Finder } from '../'
import { QUERY, DEFAULT } from '../../shared'; 
import { Int, NVarChar } from 'mssql';

export class Auth {

    /**
     * Check if the actionId is in the permissions
     * @param {number} UserId 
     * @param {string} Action 
     * @returns {Promise<boolean>} - Returns true if the action is found in permissions
    */
    static isPermission = async (UserId: number = 0, Action: string = ''): Promise<boolean> => {
        let flag = false;
        try {
            if (!Action || typeof Action !== 'number') return flag;
            if (!UserId || typeof UserId !== 'string') return flag;
            flag = await Finder.findByField(QUERY.q00x000, ['UserId','Action'], [Int, NVarChar(50)], [UserId, Action]);
        } catch (error:any) {
            console.log('isPermission Error:', error.array());
        } return flag;
    };

    /**
     * Check if the record is default
     * @param {number} Id - Record Id
     * @param {String} Table - Database table
     * @returns {Promise<String>} - returns true or flase
    */
    static isDefaultRecord = async (Id: number = 0, Table: string = ''): Promise<boolean> => {
        let flag = false;
        try {
            if (!Id || !Table) return flag;
            if (DEFAULT[Table] && DEFAULT[Table].includes(Id)) flag = true;
        } catch(error:any) {
            console.log('isDefaultRecord Error: ' + error.array());
        } return flag;
    }; 
} // END CLASS
   
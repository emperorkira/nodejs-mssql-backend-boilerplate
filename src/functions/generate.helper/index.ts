/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import {Int, } from 'mssql'; import crypto from 'crypto'; import jwt from 'jsonwebtoken'; 
import { Get } from '../../models';
import { QUERY } from '../../shared';

export class Generate {
    
     /**
     * Creates a new token
     * @param {number} User - User Id
     * @returns {Promise<String>} - returns a string of encrypted token
     */
     static getUserPermissions = async (Id = 0) => {
        try {
            if (!Id) return null;
            const userExists = await Get.recordById(Id, tbl.t010);
            if (!userExists) return null;
            const permissions = await Get.recordByFields(QUERY.q010x001, ['RoleId'], [Int], [Id]);
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
    static generateToken = async (user = 0) => {
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
    static generateRefreshToken = async (user = 0) => {
        try {
            if (!user) return null;
            return jwt.sign({ user }, token.REFRESH, { expiresIn: "8h" });
        } catch(error) {
            console.log('Error Functions generateRefreshToken');
            return null;
        }
    }

}
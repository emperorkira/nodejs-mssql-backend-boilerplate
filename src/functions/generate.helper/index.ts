/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import {Int, } from 'mssql'; import crypto from 'crypto'; import jwt from 'jsonwebtoken'; 
import { Get } from '../../models';
import { QUERY, TABLE } from '../../shared';

export class Generate {
    
    /**
     * Creates a new token
     * @param {number} User - User Id
     * @returns {Promise<String>} - returns a string of encrypted token
     */
    static generateToken = async (user = 0): Promise<string> => {
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
    static generateRefreshToken = async (user = 0): Promise<string> => {
        try {
            if (!user) return null;
            return jwt.sign({ user }, token.REFRESH, { expiresIn: "8h" });
        } catch(error) {
            console.log('Error Functions generateRefreshToken');
            return null;
        }
    }

}
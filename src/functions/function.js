import { config as dotenvConfig } from 'dotenv'; import sql from 'mssql'; import crypto from 'crypto'; import bcrypt from 'bcrypt'; import jwt from 'jsonwebtoken'; import { GET } from '../models/index.js'
import { token } from '../type/index.js'

    export const getUserByUsername = async (Username = '') => {
        try{
            if (!Username) return null;
            const user = GET.record_by_fields('SELECT * FROM [dbo].[User] WHERE Username = @Username',['Username'],[sql.NVarChar(255)],[Username]);
            if (!user) console.log('No user found');
            return user || null;
        }catch(error){
            console.log('Error Functions auth_function.getUserByUsername');
            return null;
        }
    }
    
    export const generateToken = async (user = 0) => {
        try{
            if (!user) return null;
            return jwt.sign({ user }, token.SECRET, { expiresIn: "30m" });
        }catch(error){
            console.log(' Error Functions auth_function.generateToken');
            return null;
        }
    }

    export const generateRefreshToken = async (user = 0) => {
        try{
            if (!user) return null;
            return jwt.sign({ user }, token.REFRESH, { expiresIn: "8h" });
        }catch(error){
            console.log('Error Functions auth_function.generateRefreshToken');
            return null;
        }
    }

    export const hashPassword = async (Password = '') => {
        try{
            if (!Password) return null;
            const algorithm = "aes-256-cbc";
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv( algorithm, Buffer.from(token.ENCRYPTION, "hex"), iv );
            let encryptedPassword = cipher.update(Password, "utf8", "hex");
            encryptedPassword += cipher.final("hex");
            return iv.toString("hex") + encryptedPassword;
        }catch(error){
            console.log('Error Functions auth_function.hashPassword');
            return null;
        }
    }

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
    };

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
    };

    export const generateCode = async (Table = '') => {
        try {
          if (!Table) {
            console.log('Table is missing');
            return null;
          }
          const latest = await GET.record_by_query(`SELECT MAX([Code]) AS Code FROM ${Table}`);
          const code = String(parseInt(latest[0].Code || 0, 10) + 1).padStart( 6, "0" );
          return code || null;
        } catch (error) {
          console.log('Error in comparePassword function:', error.message);
          return null;
        }
    };
    /*( async() => {
        const code = await comparePassword('helloworld', 'b813e59b57962b54124ff0bbfb6c3471e61c7cf82aef69b89d7115d6ee794b33');
        console.log(code);
    })();*/
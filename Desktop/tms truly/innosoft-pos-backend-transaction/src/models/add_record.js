import { conn } from '../database/index.js';
import sql from 'mssql';
export const { Int, NVarChar, Decimal, Date, DateTime } = sql;

export class ADD {
  /**
   * Insert one record
   * @param {string} Table - The name of the table.
   * @param {Array} Field - An array of field names.
   * @param {Array} Type - An array of SQL data types corresponding to the fields.
   * @param {Array} Data - An array of data values corresponding to the fields.
   * @returns {Promise<boolean>} - Returns true if the record is successfully inserted.
   */
  static async record(Table = '', Field = [], Type = [], Data = []) {
    let pool, flag = false;
    try {
      if (!Table) throw new Error('Table name field is missing.');
      if (!Field || !Data || Field.length !== Data.length || Field.length !== Type.length) {
        throw new Error('Parameter is empty, or their lengths do not match');
      }

      pool = await conn();
      pool.setMaxListeners(15);
      const request = pool.request();
      const fieldNames = Field.join(', ');
      const fieldParams = Field.map(field => `@${field}`).join(', ');

      const query = `INSERT INTO ${Table}(${fieldNames}) VALUES (${fieldParams})`;

      Field.forEach((field, index) => {
        if (Data[index] === undefined) {
          throw new Error(`Data for field '${field}' is undefined`);
        }
        request.input(field, Type[index], Data[index]);
      });

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) flag = true;
      return flag;
    } catch (error) {
      console.error(`Error in ADD.record: ${error.message}`);
      return flag;
    } finally {
      try {
        if (pool) {
          await pool.close();
          pool = null;
        }
      } catch (error) {
        throw new Error(`Error closing database ADD.record: ${error.message}`);
      }
    }
  }
}

// Unit Test for ADD Class Functions
(async () => {
  try {
    const fields = [
      'Code', 'Username', 'Password', 'Firstname', 'Middlename', 'Lastname', 
      'Gender', 'Birthdate', 'Address', 'ContactNumber', 'Image', 
      'DepartmentId', 'RoleId', 'isDeactivated', 'CreatedBy', 'DateCreated'
    ];

    const types = [
      NVarChar(50), NVarChar(255), NVarChar(255), NVarChar(50), NVarChar(50), 
      NVarChar(50), NVarChar(50), Date, NVarChar(255), NVarChar(255), 
      NVarChar(50), Int, Int, Int, Int, DateTime
    ];

    const data = [
      '000234', "adobo_gaming", "b813e59b57962b54124ff0bbfb6c3471e61c7cf82aef69b89d7115d6ee794b33", 
      "adobo_gaming", "adobo_gaming", "adobo_gaming", "Male", "2002-01-29", 
      "E Sabellano St. Lopez Compound", "09497506210", "../../images/1710507501269.png", 
      1, 5, 0, 2, "2024-02-25 20:11:03.000"
    ];

    //const res = await ADD.record('[dbo].[User]', fields, types, data);
    console.log('Record inserted:', res);
  } catch (error) {
    console.error(error);
  }
})();

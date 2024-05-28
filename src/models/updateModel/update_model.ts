  /**
   * AUTHOR       : Mark Dinglasa
   * COMMENT/S    : N/A
   * CHANGES      : N/A
   * LOG-DATE     : 2024-05-27 11:48PM
  */
  import { conn } from '../../config';
  import sql from 'mssql';
  export const { Int, NVarChar, Decimal, Date, DateTime, Transaction, Request } = sql;

export class UPDATE {
    /**
         * Edit one record
         * @param {number} Id - The Id of the record.
         * @param {string} Table - The name of the table.
         * @param {Array} Field - An array of field names.
         * @param {Array} Type - An array of SQL data types corresponding to the Field.
         * @param {Array} Data - An array of data values corresponding to the Field.
         * @returns {Promise<boolean>} - Returns true if the record is successfully inserted.
     */
    /*
    static async record(Id = 0, Table = '', Field = [], Type = [], Data = []) {
        let pool, flag = false; Id = parseInt(Id, 10);
        try {
          if (!Id) throw new Error('Id field is missing.');
          if (!Table) throw new Error('Table name field is missing.');
          if (!Array.isArray(Field) || !Array.isArray(Data) || !Array.isArray(Type) || Field.length !== Data.length || Field.length !== Type.length) throw new Error('Field, Data, or Type arrays are either not arrays or have different lengths.');
          pool = await conn();
          pool.setMaxListeners(15);
          const request = pool.request();
          const setExpressions = Field.map((field, index) => `${field} = @${field}`).join(', ');
          Field.forEach((field, index) => {
            request.input(field, Type[index], Data[index]);
          });
          request.input('Id', Int, Id);
          const query = `UPDATE [dbo].[${Table}] SET ${setExpressions} WHERE Id = @Id`;
          const result = await request.query(query);
          if (result.rowsAffected[0] > 0) flag = true;
          return flag;
        } catch (error) {
          console.log(`Error UPDATE.record: ${error.message}`);
          return flag;
        } finally {
          try {
            if (pool) {
              await pool.close();
            }
          } catch (error) {
            throw new Error(`Error closing database pool (update): ${error.message}`);
          }
        }
      } // END HERE
*/
    /**
     * Edit multiple records with specific conditions
     * @param {Array} ConditionField - An array of objects representing conditions for the WHERE clause. Each object should have keys: field, type, and value.
     * @param {string} Table - The name of the table.
     * @param {Array} Field - An array of field names to be updated.
     * @param {Array} Type - An array of SQL data types corresponding to the Field.
     * @param {Array} Data - An array of arrays, each containing data values corresponding to the Field.
     * @returns {Promise<boolean>} - Returns true if the records are successfully updated.
     */
    /*
    static async records(ConditionField = [], Table = '', Field = [], Type = [], Data = []) {
      let pool, transaction, flag = false; 
      try {
          if (!Array.isArray(ConditionField) || ConditionField.length === 0) throw new Error('ConditionField array is missing or empty.');
          if (!Table) throw new Error('Table name field is missing.');
          if (!Array.isArray(Field) || !Array.isArray(Type) || !Array.isArray(Data) || Field.length !== Type.length || Field.length !== Data[0].length) throw new Error('Parameters not arrays or have different lengths.');
          pool = await conn();
          pool.setMaxListeners(15);
          transaction = new sql.Transaction(pool);
          await transaction.begin();
          for (const item of Data) {
              const request = new sql.Request(transaction);
              const setExpressions = Field.map((field, index) => `${field} = @${field}${index}`);
              const whereConditions = ConditionField.map((condition, index) => `${condition.field} = @condition${index}`);
              const updateQuery = `UPDATE [dbo].[${Table}] SET ${setExpressions.join(', ')} WHERE ${whereConditions.join(' AND ')}`;
              Field.forEach((field, index) => { request.input(`${field}${index}`, Type[index], item[index]); });
              ConditionField.forEach((condition, index) => { request.input(`condition${index}`, condition.type, condition.value); });
              await request.query(updateQuery);
          }
          await transaction.commit();
          flag = true;
          return flag;
      } catch (error) {
          if (transaction) { await transaction.rollback(); }
          console.log(`Error UPDATE.records: ${error.message}`);
          return flag;
      } finally {
          try {
              if (pool) { await pool.close(); }
          } catch (error) {
              throw new Error(`Error closing database connection (update): ${error.message}`);
          }
      }
    } // END HERE
*/
    /**
     * Update multiple records based on an array of IDs.
     * @param {Array} Ids - An array of record IDs to update.
     * @param {string} Table - The name of the table.
     * @param {Array} Field
     * @param {Array} Type 
     * @param {Array} Data
     * @returns {Promise<Boolean>}
     */
    /*
    static async record_by_ids(Ids = [], Table = '', Field = [], Type = [], Data = []) {
        let pool, transaction, flag = false;
        try {
            if (!Table) throw new Error('Table is missing or empty.');
            if (!Array.isArray(Ids) || Ids.length === 0) throw new Error('Ids parameter is missing or empty.');
            if (!Array.isArray(Field) || !Array.isArray(Type) || !Array.isArray(Data) || Field.length !== Type.length) throw new Error('Parameters are not arrays or have different lengths.');
            pool = await conn();
            pool.setMaxListeners(15);
            transaction = new sql.Transaction(pool);
            await transaction.begin();
            const request = new sql.Request(transaction);
            const idParams = Ids.map((_, index) => `@Id${index}`).join(', ');
            Ids.forEach((id, index) => { request.input(`Id${index}`, sql.Int, id); });
            const setExpressions = Field.map((field, index) => `${field} = @${field}`).join(', ');
            Field.forEach((field, index) => { request.input(field, Type[index], Data[index]); });
            const updateQuery = `UPDATE ${Table} SET ${setExpressions} WHERE Id IN (${idParams})`;
            const result = await request.query(updateQuery);
            if (result.rowsAffected[0] > 0) flag = true;
            await transaction.commit();
            return flag;
        } catch (error) {
            if (transaction) await transaction.rollback();
            console.log(`Error in record_by_ids: ${error.message}`);
            return flag;
        } finally {
            try {
                if (pool) { await pool.close(); pool = null; }
            } catch (error) {
                throw new Error(`Error closing database pool (record_by_ids): ${error.message}`);
            }
        }
    } // END HERE
    */
}; // END CLASS

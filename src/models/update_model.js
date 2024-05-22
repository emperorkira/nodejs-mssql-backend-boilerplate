import { conn } from '../database/index.js';
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
    static async record(Id = 0, Table = '', Field = [], Type = [], Data = []) {
        let pool, flag = false;
        try {
          if (!Id) throw new Error('Id field is missing.');
          if (!Table) throw new Error('Table name field is missing.');
          if (!Array.isArray(Field) || !Array.isArray(Data) || !Array.isArray(Type) || Field.length !== Data.length || Field.length !== Type.length) {
            throw new Error('Field, Data, or Type arrays are either not arrays or have different lengths.');
          }
          pool = await conn();
          pool.setMaxListeners(15);
          const request = pool.request();
          const setExpressions = Field.map((field, index) => `${field} = @${field}`).join(', ');
          Field.forEach((field, index) => {
            request.input(field, Type[index], Data[index]);
          });
          request.input('Id', Int, Id);
          const query = `UPDATE ${Table} SET ${setExpressions} WHERE Id = @Id`;
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

    /**
     * Edit multiple records with specific conditions
     * @param {Array} ConditionField - An array of objects representing conditions for the WHERE clause. Each object should have keys: field, type, and value.
     * @param {string} Table - The name of the table.
     * @param {Array} Field - An array of field names to be updated.
     * @param {Array} Type - An array of SQL data types corresponding to the Field.
     * @param {Array} Data - An array of arrays, each containing data values corresponding to the Field.
     * @returns {Promise<boolean>} - Returns true if the records are successfully updated.
     */
    static async records(ConditionField = [], Table = '', Field = [], Type = [], Data = []) {
      let pool, transaction, flag = false;
      try {
          if (!Array.isArray(ConditionField) || ConditionField.length === 0) throw new Error('ConditionField array is missing or empty.');
          if (!Table) throw new Error('Table name field is missing.');
          if (!Array.isArray(Field) || !Array.isArray(Type) || !Array.isArray(Data) || Field.length !== Type.length || Field.length !== Data[0].length) throw new Error('Invalid input: Field, Type, or data arrays are either not arrays or have different lengths.');
          if (Data.length === 0) throw new Error('Data array is empty.');
          pool = await conn();
          pool.setMaxListeners(15);
          transaction = new sql.Transaction(pool);
          await transaction.begin();
          for (const item of Data) {
              const request = new sql.Request(transaction);
              const setExpressions = Field.map((field, index) => `${field} = @${field}${index}`);
              const whereConditions = ConditionField.map((condition, index) => `${condition.field} = @condition${index}`);
              const updateQuery = `UPDATE ${Table} SET ${setExpressions.join(', ')} WHERE ${whereConditions.join(' AND ')}`;
              Field.forEach((field, index) => { request.input(`${field}${index}`, Type[index], item[index]); });
              ConditionField.forEach((condition, index) => { request.input(`condition${index}`, condition.type, condition.value); });
              await request.query(updateQuery);
          }
          await transaction.commit();
          flag = true;
          return flag;
      } catch (error) {
          if (transaction) {
              await transaction.rollback();
          }
          console.log(`Error UPDATE.records: ${error.message}`);
          return flag;
      } finally {
          try {
              if (pool) {
                  await pool.close();
              }
          } catch (error) {
              throw new Error(`Error closing database connection (update): ${error.message}`);
          }
      }
    } // END HERE
}; // END CLASS


// UNIT TEST FOR UPDATE.record
/*
(async () => {
  try {
    const Field = [
      'Code', 'Username'
    ];

    const types = [
      NVarChar(50), NVarChar(255)
    ];

    const data = [
      '000010', "esgaming"
    ];

    const res = await UPDATE.record(6029,'[dbo].[User]', Field, types, data);
    
    console.log('Record inserted:', res);
  } catch (error) {
    console.error(error);
  }
})();*/

// UNIT TEST FOR UPDATE.records
/*
(async () => {
    try {
      const conditionFields = [
        { field: 'UserId', type: Int, value: 2 }
      ];
      const fields = ['Description', 'Status'];
      const types = [NVarChar(255), Int];
      const data = [
        ['new_username1', 2],
        ['new_username2', 2],
        // Add more records as needed
      ];
  
      const result = await UPDATE.records(conditionFields, '[dbo].[Notification]', fields, types, data);
      console.log('Update result:', result);
    } catch (error) {
      console.error(error);
    }
  })();
  */
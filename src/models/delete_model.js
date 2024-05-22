import { conn } from '../database/index.js';
import sql from 'mssql'; 
export const { Int, NVarChar } = sql;

export class DELETE {
  /**
   * Remove specific record from a given Id.
   * @param {number} Id
   * @param {string} Table
   * @returns {Promise<Boolean>}
   */
    static async record_by_id(Id = 0, Table = '') {
        let pool, flag = false;
        try {
            if (typeof Id !== 'number' || !Id) throw new Error('Id must be a number');
            if (typeof Table !== 'string' || !Table) throw new Error('Table must be a string');
            
            pool = await conn(); 
            pool.setMaxListeners(15);
            const request = pool.request();
            request.input('Id', Int, Id);
            const result = await request.query(`DELETE FROM ${Table} WHERE Id = @Id`);
            
            if (result.rowsAffected[0] === 1) flag = true;
            return flag;
        } catch (error) {
            console.error(`Error deleting record from ${Table} by ID: ${error.message}`);
            return flag;
        } finally {
            try {
                if (pool) {
                    await pool.close(); 
                    pool = null;
                }
            } catch (error) {
                throw new Error(`Error closing database connection in DELETE.record_by_id: ${error.message}`);
            }
        }
    } // END HERE

  /**
   * Remove specific record from a given query.
   * @param {string} Query
   * @returns {Promise<Boolean>}
   */
  static async record_by_query(Query = '') {
    let pool, flag = false;
    try {
        if (typeof Query !== 'string' || !Query) throw new Error('Query must be a string');
        pool = await conn(); pool.setMaxListeners(15);
        const request = pool.request();
        await request.query(Query);
        return flag = true;
    } catch (error) {
        console.log(`Error closing database DELETE.record_by_query: ${error.message}`);
        return flag;
    } finally {
        try {
            if (pool) {
            await pool.close(); pool = null;
            }
        } catch (error) {
            throw new Error(`Error closing database DELETE.record_by_query: ${error.message}`);
        }
    }
  } // END HERE
  
    /**
     * Remove specific record from a given query.
     * @param {string} Query
     * @returns {Promise<Boolean>}
     */
    static async record_by_idwfields(Id = 0, Field = [], Table = '') {
        let pool, flag = false;
        try {
            pool = await conn(); pool.setMaxListeners(15);
            const request = pool.request();
            request.input('Id', Int, Id);
            const result = await request.query(`DELETE FROM ${Table} WHERE ${Field} = @Id`);
            if (result.rowsAffected[0] > 0) flag = true;
            return flag
        } catch (error) {
            console.log(`Error closing database DELETE.record_by_idwfields: ${error.message}`);
            return flag;
        } finally {
            try {
                if (pool) {
                    await pool.close(); pool = null;
                }
            } catch (error) {
                throw new Error(`Error closing database pool(deleteAllWithField): ${error.message}`);
            }
        }
    } // END HERE

    /**
     * Remove multiple records based on given fields.
     * @param {string} Table - The name of the table.
     * @param {Array} Field - An array of field names for the WHERE clause.
     * @param {Array} Type - An array of SQL data types corresponding to the Field.
     * @param {Array} Data - An array of data values corresponding to the Field.
     * @returns {Promise<Boolean>}
     */
    static async record_by_fields(Table = '', Field = [], Type = [], Data = []) {
        let pool, flag = false;
        try {
            if (!Table) throw new Error('Table is missing or empty.');
            if (!Array.isArray(Field) || !Array.isArray(Type) || !Array.isArray(Data) || Field.length !== Type.length || Field.length !== Data.length) {
                throw new Error('Array parameters are missing, empty, or their lengths do not match.');
            }
            pool = await conn(); 
            pool.setMaxListeners(15);
            const request = pool.request();
            const whereClauses = Field.map((field, index) => `${field} = @${field}`).join(' AND ');
            Field.forEach((field, index) => {
                request.input(field, Type[index], Data[index]);
            });

            const query = `DELETE FROM ${Table} WHERE ${whereClauses}`;
            const result = await request.query(query);

            if (result.rowsAffected[0] > 0) flag = true;
            return flag;
        } catch (error) {
            console.log(`Error in DELETE.record_by_idwfields: ${error.message}`);
            return flag;
        } finally {
            try {
                if (pool) {
                    await pool.close();
                    pool = null;
                }
            } catch (error) {
                throw new Error(`Error closing database pool (delete): ${error.message}`);
            }
        }
    } // END HERE

    /**
     * Remove multiple records based on an array of IDs.
     * @param {Array} Ids - An array of record IDs to delete.
     * @param {string} Table - The name of the table.
     * @returns {Promise<Boolean>}
     */
    static async record_by_ids(Ids = [], Table = '') {
        let pool, transaction, flag = false;
        try {
            if (!Table) throw new Error('Table is missing or empty.');
            if (!Array.isArray(Ids) || Ids.length === 0) throw new Error('Ids parameter is missing or empty.');

            pool = await conn();
            pool.setMaxListeners(15);
            transaction = new sql.Transaction(pool);

            await transaction.begin();
            const request = new sql.Request(transaction);

            // Use a parameterized query to prevent SQL injection
            const idParams = Ids.map((_, index) => `@Id${index}`).join(', ');
            Ids.forEach((id, index) => {
                request.input(`Id${index}`, sql.Int, id);
            });

            const query = `DELETE FROM ${Table} WHERE Id IN (${idParams})`;
            const result = await request.query(query);

            if (result.rowsAffected[0] > 0) flag = true;

            await transaction.commit();
            return flag;
        } catch (error) {
            if (transaction) await transaction.rollback();
            console.log(`Error in DELETE.record_by_ids: ${error.message}`);
            return flag;
        } finally {
            try {
                if (pool) {
                    await pool.close();
                    pool = null;
                }
            } catch (error) {
                throw new Error(`Error closing database pool (delete): ${error.message}`);
            }
        }
    } // END HERE
}; // END CLASS

/**
 *  UNTI TEST FOR [DELETE Class Functions]
 *  WORKING AS EXPECTED
 *  May 21 2024
 * 

(async () => {
  try {
    // const data = await DELETE.record_by_id(4027,'[dbo].[User]'); // record_by_id
    // const data = await DELETE.record_by_query('DELETE FROM [dbo].[User] WHERE Id = 3020'); // record_by_query
    // const data = await DELETE.record_by_idwfields(3017,'UserId','[dbo].[AuditTrail]'); // record_by_query usually used to delete all linked/sub/children records
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();
 */


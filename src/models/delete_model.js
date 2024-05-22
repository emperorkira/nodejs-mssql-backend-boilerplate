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


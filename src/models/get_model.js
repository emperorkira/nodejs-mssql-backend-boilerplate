import { conn } from '../database/index.js';
import sql from 'mssql'; 
export const { Int, NVarChar } = sql;

export class GET {
  /**
   * Retrieves all records from a given Table.
   * @param {string} Table
   * @returns {Promise<Array>}
   */
  static async all_record(Table = '') {
    let pool;
    try {
      if (typeof Table !== 'string') throw new Error('Table must be a string');
      pool = await conn(); 
      pool.setMaxListeners(15);
      const request = pool.request();
      const result = await request.query(`SELECT * FROM ${Table}`);
      return result.recordset || [];
    } catch (error) {
      throw new Error(`Error fetching all records from ${Table}: ${error.message}`);
    } finally {
      try {
        if (pool) {
          await pool.close(); pool = null;
        }
      } catch (error) {
        throw new Error(`Error closing database connection in GET.all_records: ${error.message}`);
      }
    }
  } // END all_records

  /**
   * Retrieves 1 specific record from a given Id & Table.
   * @param {number} Id
   * @param {string} Table
   * @returns {Promise<Array>}
   */
  static async record_by_id(Id=0, Table='') {
    let pool;
    try {
      if (isNaN(Id)) throw new Error('Id must be a number');
      if (typeof Table !== 'string') throw new Error('Table must be a string');
      pool = await conn(); pool.setMaxListeners(15);
      const request = pool.request();
      request.input('Id', Int, Id);
      const result = await request.query(`SELECT * FROM ${Table} WHERE Id = @Id`);
      return (result.recordset.length > 0)? result.recordset[0]:  null;
    } catch (error) {
      throw error;
    } finally {
      try {
        if (pool) {
          await pool.close(); pool = null;
        }
      } catch (error) {
        throw new Error(`Error closing database GET.record_by_id: ${error.message}`);
      }
    }
  } // END HERE

  /**
   * Retrieves specific record from a given fields.
   * @param {string}  Query
   * @param {Array}   Field
   * @param {Array}   Type
   * @param {Array}   Data
   * @returns {Promise<Array>}
   */
  static async record_by_fields(Query='', Field = [], Type = [], Data = []) {
    let pool;
    try {
      if (!Query) throw new Error('Query is empty');
      if (!Field || !Data || Field.length !== Data.length || Field.length !== Type.length) throw new Error('Parameters are empty, or their lengths do not match');
      pool = await conn(); pool.setMaxListeners(15);
      const request = pool.request();
      for (let i = 0; i < Field.length; i++) {
        if (Data[i] === undefined) throw new Error(`Data for field '${Field[i]}' is undefined`);
        request.input(Field[i], Type[i], Data[i]);
      }
      const result = await request.query(Query);
      return result.recordset || [];
    } catch (error) {
      throw error;
    } finally {
      try {
        if (pool) {
          await pool.close(); pool = null;
        }
      } catch (closeError) {
        throw new Error(`Error closing database GET.record_by_fields: ${error.message}`);
      }
    }
  } // END HERE

  /**
   * Retrieves records from a given Id & Query.
   * @param {number} Id
   * @param {string} Query
   * @returns {Promise<Array>}
   */
  static async record_by_idwquery(Id=0, Query='') {
    let pool;
    try {
      if (isNaN(Id) || !Id) throw new Error('Id must be a number');
      if (!Query) throw new Error('Query is empty or invalid');
      pool = await conn(); pool.setMaxListeners(15);
      const request = pool.request();
      request.input('Id', Int, Id);
      const result = await request.query(Query);
      return result.recordset || [];
    } catch (error) {
      throw error;
    } finally {
      try {
        if (pool) {
          await pool.close(); pool = null;
        }
      } catch (error) {
          throw new Error(`Error closing database GET.record_by_idwquery: ${error.message}`);
      }
    }
  }// END HERE

  /**
   * Retrieves records from given query
   * @param {string} Query
   * @returns {Promise<Array>}
   */
  static async record_by_query(Query='') {
    let pool;
    try {
      if (!Query) throw new Error('Query is empty or invalid');
      pool = await conn(); pool.setMaxListeners(15);
      const c72717374 = pool.request();
      const d72736C74 = await c72717374.query(Query);
      return d72736C74.recordset || [];
    } catch (error) {
      throw new Error(`Database Query error: ${error}`);
    } finally {
      try {
        if (pool) {
          await pool.close(); pool = null;
        }
      } catch (error) {
        throw new Error(`Error closing database GET.record_by_query: ${error.message}`);
      }
    }
  } // END HERE
}; // END CLASS

/**
 *  UNTI TEST FOR [GET Class Functions]
 *  WORKING AS EXPECTED
 *  May 21 2024
 * 
 
(async () => {
  try {
    // const data = await GET.all_records('[dbo].[User]'); // all_records
    // const data = await GET.record_by_id(2,'[dbo].[User]'); // all_records
    // const data = await GET.record_by_fields('SELECT * FROM [dbo].[User] WHERE Username=@Username', ['Username'],[NVarChar(255)],['AdminTesting']); // records_by_fields
    // const data = await GET.record_by_idwquery(2, 'SELECT * FROM [dbo].[User] WHERE Id = @Id'); // record_by_idwquery
    // const data = await GET.record_by_query( '123'); // record_by_query
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
})();
*/

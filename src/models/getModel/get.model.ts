/**
 * AUTHOR       : Mark Dinglasa
 * COMMENT/S    : N/A
 * CHANGES      : N/A
 * LOG-DATE     : 2024-05-27 11:48PM
*/

import poolPromise, { conn } from '../../config/database.config';
import { Int } from 'mssql';
export class GET {
  /**
   * Retrieves all records from a given Table.
   * @param {string} Table
   * @returns {Promise<Array>}
   */
  static async recordsByTable(Table: string = ''): Promise<Array<any>> {
    try {
      if (typeof Table !== 'string' || !Table) return Promise.reject(new Error('Table must be a string'));
      const pool:any = await conn(); 
      const request = pool.request();
      const result = await request.query(`SELECT * FROM [${Table}]`);
      if (!result.recordset || result.recordset.length < 1) return Promise.reject(new Error('Database query returned no results.'));
      return result.recordset;
    } catch (error:any) {
      throw new Error(`Error fetching all records from ${Table}: ${error.message}`);
    } 
  } // END HERE
  
  /**
   * Retrieves 1 specific record from a given Id & Table.
   * @param {number} Id
   * @param {string} Table
   * @returns {Promise<Array>}
   */
  static async recordById(Id: number = 0, Table: string = ''): Promise<any | null> {
    try {
        if (isNaN(Id) || typeof Id !== 'number') throw new Error('Id must be a valid number');
        if (!Table || typeof Table !== 'string') throw new Error('Table name must be provided as a non-empty string');
        if (Id <= 0) throw new Error('Id must be a positive non-zero number');
        const pool:any = await conn();
        const request = pool.request();
        request.input('Id', Int, Id);
        const result = await request.query(`SELECT * FROM [${Table}] WHERE [Id] = @Id`);
        if (!result.recordset || result.recordset.length < 1) throw new Error('Database query returned no results');
        return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error:any) {
        throw new Error(`Error fetching record from ${Table}: ${error.message}`);
    }
}// END HERE

  /**
   * Retrieves specific record from a given fields.
   * @param {string}  Query
   * @param {Array}   Field
   * @param {Array}   Type
   * @param {Array}   Data
   * @returns {Promise<Array>}
   */
  /*
  static async record_by_fields(Query: string='', Field: Array<any> = [], Type: Array<any> = [], Data: Array<any> = []): Promise<Array<any>> {
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
*/
  /**
   * Retrieves records from a given Id & Query.
   * @param {number} Id
   * @param {string} Query
   * @returns {Promise<Array>}
   */
  /*
  static async record_by_idwquery(Id: number=0, Query: string=''): Promise<Array<any>> {
    let pool; Id = parseInt(Id, 10);
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
*/
  /**
   * Retrieves records from given query
   * @param {string} Query
   * @returns {Promise<Array>}
   */
  /*
  static async record_by_query(Query: string=''): Promise<Array<any>> {
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
  */
}; // END CLASS
/*
(async() => {
  const get = await GET.recordById(1, 'User')
  console.log(get);
})();*/
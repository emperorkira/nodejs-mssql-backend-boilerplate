//INCLUDE DATABASE CONNECTION
const db = require("../database/db");
const sql = require('mssql');

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

class Models {
  /****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getAll(tableName)
  ****************************************************************/
  static async getAll(tableName) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `SELECT * FROM ${tableName}`;
      const result = await request.query(query);
      // Return only the data rows, not the entire result object
      if (result.recordset.length > 0) return result.recordset; 
      else  return [];// Handle the case where no data was found with the given Id 
    } catch (error) { throw error; }
    finally { if (pool) pool.close();  } // Release the connection back to the pool
  }//END FUNCTION HERE

/****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL DATA OF A SPECIFIC ID
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id, tableName)
  ****************************************************************/
  static async get(Id, tableName) {
    let pool;
    try {
       // Check if Id is a number
      if (isNaN(Id)) {
       throw new Error('Id must be a number');
      }
      if(!isString(tableName)){
        throw new Error('tableName must be a string');
      }

      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `SELECT *
                    FROM ${tableName}
                    WHERE Id = @Id`;
      request.input('Id', sql.Int, Id);

      const result = await request.query(query);
      if (result.recordset.length > 0) return result.recordset[0];  // Return the first data found (assuming Id is unique)
      else  return [];  // Handle the case where no data was found with the given Id
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE

  /****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL DATA OF A SPECIFIC ID
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getWithQuery(Id, tableName)
  ****************************************************************/
  static async getWithQuery(Id, query) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      request.input('Id', sql.Int, Id);

      const result = await request.query(query);
      if (result.recordset.length > 0) return result.recordset;  // Return the first data found (assuming Id is unique)
      else  return [];  // Handle the case where no data was found with the given Id
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE


  /****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL DATA WITH A SPECIFIC QUERY
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : getWithQuery(Id, query)
  ****************************************************************/
  static async getAllWithQuery(query) {
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
      const result = await request.query(query);
  
      if (result.recordset.length > 0) {
        return result.recordset; // Return the data found
      } else {
        return []; // Return an empty array when no data is found
      }
    } catch (error) {
      console.error('Error in getAllWithQuery:', error);
      throw new Error('Database query error'); // Provide a more meaningful error message if needed
    } finally {
      if (pool) {
        try {
          await pool.close(); // Release the connection back to the pool
        } catch (closeError) {
          console.error('Error closing the connection:', closeError);
        }
      }
    }
  }
  

  /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL DATA OF A SPECIFIC ID
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id, tableName)
  ****************************************************************/
  static async find(Id, tableName) {
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
      const query = `SELECT *
                      FROM ${tableName}
                      WHERE Id = @Id`;
      request.input('Id', sql.Int, Id);
  
      const result = await request.query(query);
      if (result.recordset.length > 0) {
        return true; // Return the first data found (assuming Id is unique)
      } else {
        return false; // Handle the case where no data was found with the given Id
      }
    } catch (error) {
      console.error('Error in find function:', error);
      throw error; // You can also handle the error more gracefully here if needed
    } finally {
      if (pool) {
        try {
          await pool.close(); // Release the connection back to the pool
        } catch (closeError) {
          console.error('Error closing the connection:', closeError);
        }
      }
    }
  }//END FUNCTION

  /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : GET ALL DATA OF A SPECIFIC ID
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id, tableName)
  ****************************************************************/
  static async findWithQuery(query) {
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
  
      const result = await request.query(query);
      if (result.recordset.length > 0) {
        return true; // Return true if data is found
      } else {
        return false; // Return false if no data is found
      }
    } catch (error) {
      console.error('Error in findWithQuery function:', error);
      throw error; // You can also handle the error more gracefully here if needed
    } finally {
      if (pool) {
        try {
          await pool.close(); // Release the connection back to the pool
        } catch (closeError) {
          console.error('Error closing the connection:', closeError);
        }
      }
    }
  }
  

  /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : DELETE A SPECIFIC DATA USING ID
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
  ****************************************************************/
  static async delete(Id, tableName) {
    let pool;
    try {
      pool = await db.initializePool();       //SET DATABASE CONENCTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `DELETE FROM ${tableName} WHERE Id = @Id`;
      request.input("Id", sql.Int, Id);

      const result = await request.query(query);
      if (result.rowsAffected[0] === 1) return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE

  /****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 10, 2023
  PURPOSE              : DELETE A SPECIFIC DATA USING ID
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : delete(Id)
  ****************************************************************/
  static async deleteAllWithField(Id, Field, TableName) {
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
      
      // Construct the SQL query with placeholders for values, not table or column names
      const query = `DELETE FROM ${TableName} WHERE ${Field} = @Id`;
  
      request.input('Id', sql.Int, Id);
  
      const result = await request.query(query);
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    } finally {
      if (pool) {
        pool.close(); // Release the connection back to the pool
      }
    }
  }
  //END FUNCTION HERE

  /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : October 18, 2023
  PURPOSE              : DELETE A SPECIFIC DATA IN MULTIPLE TABLES
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : deleteMultiple(Id)
  ****************************************************************/
  static async deleteMultiple(Id, FieldList, tableList) {
    let pool, transaction;
    try {
      if (!tableList || !Array.isArray(tableList) || tableList.length === 0) {
        throw new Error('Invalid or empty tTable ist.');
      }
      if (!FieldList || !Array.isArray(FieldList) || FieldList.length !== tableList.length) {
        throw new Error('Invalid or empty Field List.');
      }
  
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      transaction = new sql.Transaction(pool);
      await transaction.begin();
  
      for (let i = 0; i < tableList.length; i++) {
        const request = new sql.Request(transaction);
        const query = `DELETE FROM ${tableList[i]} WHERE ${FieldList[i]} = @Id`;
        request.input("Id", sql.Int, Id);
        await request.query(query);
      }
  
      await transaction.commit(); // COMMIT THE DELETIONS
      return true;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      // Log the error for debugging purposes
      console.error('Error in deleteMultiple function:', error);
      throw error;
    } finally {
      if (pool) {
        pool.close();
      }
    }
  }
  

  /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : LOCK A SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : lock(Id, tableName)
  ****************************************************************/
  static async lock(Id, tableName) {
    let pool;
    let data=1;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        UPDATE ${tableName} SET
          IsLocked = @IsLocked
        WHERE Id = @Id
      `;
      request
        .input('Id', sql.Int, Id) // Assuming there's an 'Id' field to specify the record to update
        .input('IsLocked', sql.Int, data || 0);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;  // Rows were affected, indicating successful update
      else return false; // No rows were affected, indicating update failed
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE

  /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : UNLOCK A SPECIFIC DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : unlock(Id, tableName)
  ****************************************************************/
  static async unlock(Id, tableName) {
    let pool;
    let data=0;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        UPDATE ${tableName} SET
          IsLocked = @IsLocked
        WHERE Id = @Id
      `;
      request
        .input('Id', sql.Int, Id) // Assuming there's an 'Id' field to specify the record to update
        .input('IsLocked', sql.Int, data || 0);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;  // Rows were affected, indicating successful update
      else return false; // No rows were affected, indicating update failed
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE
  
}//END CLASS MODELS

//EXPORT THE CLASS
module.exports = {
    Models: Models,
  };
  
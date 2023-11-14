/*
**README**
TO USE THIS FUNCTIONS
First you have to 
Open SQL Server Management Studio (SSMS).
Click on "Tools" in the top menu.
Choose "Options."
In the "Options" window, navigate to "Designers" > "Table and Database Designers."
Find the "Warn on null primary keys in query" option and uncheck it.
Find the "Warn about difference detection" option and uncheck it.
Find the "Warn about tables affected" option and uncheck it.
Find the "Prevent saving changes that require table re-creation" option and uncheck it.
Click "OK" to save the changes.
*/


//MODELS-LIB
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

/****************************************************************
  STATUS               : Working
  DATE CREATED/UPDATED : October 21, 2023
  PURPOSE              : add new column field to a table
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : addTableColumn(schema,tableName,field)
****************************************************************/
const addTableColumn = async(schema,tableName,field) =>{
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
      const query = `ALTER TABLE ${schema}.${tableName}
                     ADD ${field} NVARCHAR(255)`;
      const result = await request.query(query);
      console.log('add Success');
      return true;
    } catch (error) {
        console.log(error);
        return false;
    } finally {
      if (pool) pool.close();
    }
};

const dropTableColumn = async (schema, tableName, field) => {
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
      const query = `ALTER TABLE ${schema}.${tableName}
                     DROP COLUMN ${field}`;
      await request.query(query);
      console.log('drop Success');
      return true;
    } catch (error) {
        console.log(error);
      throw new Error(`Error dropping column: ${error.message}`);
    } finally {
      if (pool) pool.close();
    }
  };
  
const dropForeignKeys = async (schema, tableName, field) => {
  let pool;
  try {
    pool = await db.initializePool(); // SET DATABASE CONNECTION
    const request = pool.request(); // SET DATABASE REQUEST
    const query = `DECLARE @sql NVARCHAR(MAX) = N'';
                  SELECT @sql = @sql + N'ALTER TABLE ' + QUOTENAME(schema_name(t.schema_id)) + '.' + QUOTENAME(t.name) + ' DROP CONSTRAINT ' + QUOTENAME(fk.name) + ';
                  '
                  FROM sys.foreign_keys fk
                  INNER JOIN sys.tables t ON fk.parent_object_id = t.object_id;`;
    await request.query(query);
    console.log('drop Success');
    return true;
  } catch (error) {
      console.log(error);
    throw new Error(`Error dropping foreign keys: ${error.message}`);
  } finally {
    if (pool) pool.close();
  }
};

module.exports = { addTableColumn, dropTableColumn, dropForeignKeys};
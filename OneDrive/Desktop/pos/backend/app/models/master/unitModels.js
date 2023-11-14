//INCLUDE NECESSARY LIBRARY
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

// DEFINE THE MODEL
class Unit {
  //SET THE SCHEMA
  constructor(data) {
    this.Id=data.Id;
    this.Unit=data.Unit;
  }

  /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : static function for create or add new data
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : create(data)
  ****************************************************************/
  static async add(data) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `INSERT INTO [MstUnit]( Unit ) VALUES( @Unit )`;
      request
        .input('Unit', sql.NVarChar(50), data.Unit);


      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE


 /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : static function for update specific data
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, data)
  ****************************************************************/
  static async update(Id, data) {
    let pool;
    try {
      pool = await db.initializePool();       //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        UPDATE [MstUnit] SET
           Unit= @Unit
        WHERE Id = @Id
      `;
      request
        .input('Id', sql.Int, Id)
        .input('Unit', sql.NVarChar(50), data.Unit);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0)  return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE

}//END CLASS

//EXPORT THE CLASS
module.exports = {
  Unit: Unit,
};

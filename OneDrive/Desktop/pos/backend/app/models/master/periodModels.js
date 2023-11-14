//INCLUDE NECESSARY LIBRARY
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

// DEFINE THE MODEL
class Period { //SYSTEM TABLES - PeriodS
  constructor(data) { //SET THE SCHEMA
    this.Id=data.Id;
    this.Period=data.Period;
  }

  /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : static function for create or add new data
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : create(data)
  ****************************************************************/
  static async create(data) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        INSERT INTO [MstPeriod](Period)
        VALUES (@Period
        )
      `;
      request
        .input('Period', sql.NVarChar(50), data.Period);

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
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        UPDATE [MstPeriod] SET
           Period= @Period
        WHERE Id = @Id
      `;
      request
        .input('Id', sql.Int, Id)
        .input('Period', sql.NVarChar(50), data.Period);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE
}//END CLASS

//EXPORT THE CLASS
module.exports = {
  Period: Period,
};

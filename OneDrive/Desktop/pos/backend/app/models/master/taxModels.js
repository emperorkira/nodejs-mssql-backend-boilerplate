//INCLUDE DATABASE CONNECTION
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

// DEFINE THE MODEL
class Tax { //SYSTEM TABLES - Tax
  constructor(data){  //SET THE SCHEMA
    this.Id=data.Id;
    this.Code=data.Code;
    this.Tax=data.Tax;
    this.Rate=data.Rate;
    this.AccountId=data.AccountId;
  }

  /****************************************************************
  STATUS               : WORKING
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : static function for display all data
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : displayAll()
  ****************************************************************/
  static async displayAll() {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `SELECT 
                      [Id]
                      ,[Code]
                      ,[Tax]
                      ,[Rate]
                      ,[AccountId]
                    FROM [MstTax]`;

      const result = await request.query(query);
      // Return only the data rows, not the entire result object
      if (result.recordset.length > 0) return result.recordset;
      else return [];
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE

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
      const query = `
        INSERT INTO [MstTax](Code, Tax, Rate, AccountId)
        VALUES (@Code, @Tax, @Rate, @AccountId)
      `;
      request
        .input('Code', sql.NVarChar(50), data.Code)
        .input('Tax', sql.NVarChar(50), data.Tax)
        .input('Rate', sql.Decimal(18,5), data.Rate)
        .input('AccountId', sql.Int, data.AccountId);

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
        UPDATE [MstTax] SET
           Code= @Code,
           Tax = @Tax, 
           Rate = @Rate,
           AccountId = @AccountId
        WHERE Id = @Id
      `;
      request
      .input('Id', sql.Int, Id)
      .input('Code', sql.NVarChar(50), data.Code)
      .input('Tax', sql.NVarChar(50), data.Tax)
      .input('Rate', sql.Decimal(18,5), data.Rate)
      .input('AccountId', sql.Int, data.AccountId);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0)  return true;
      else  return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE
}//END CLASS

//EXPORT THE CLASS
module.exports = {
  Tax: Tax,
};

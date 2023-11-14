//INCLUDE NECESSARY LIBRARY
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

// DEFINE THE MODEL
//SYSTEM TABLES - CHART OF ACCOUNTS
class PayType {
  //SET THE SCHEMA
  constructor(data) {
    this.Id=data.Id;
    this.PayType=data.PayType;
    this.AccountId=data.AccountId;
    this.SortNumber=data.SortNumber;
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
      const query = ` INSERT INTO [MstPayType] (PayType, AccountId, SortNumber)
                      VALUES (@PayType, @AccountId, @SortNumber)`;
      request
      .input('PayType', sql.NVarChar(50), data.PayType)
      .input('AccountId', sql.Int, data.AccountId || null)
      .input('SortNumber', sql.Int, data.SortNumber || null);

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
        UPDATE [MstPayType] SET
          PayType= @PayType,
          AccountId = @AccountId, 
          SortNumber = @SortNumber
        WHERE Id = @Id
      `;
      request
        .input('Id', sql.Int, Id)
        .input('PayType', sql.NVarChar(50), data.PayType)
        .input('AccountId', sql.Int, data.AccountId || null)
        .input('SortNumber', sql.Int, data.SortNumber || null);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0)  return true;
      else  return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE
}//END CLASS

//EXPORT THE CLASS
module.exports = {
  PayType: PayType,
};

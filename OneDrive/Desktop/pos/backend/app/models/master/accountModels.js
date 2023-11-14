//INCLUDE NECESSARY LIBRARY
const sql = require('mssql');
const db = require("../../database/db");

// DEFINE THE MODEL
class Account { //SYSTEM TABLES - CHART OF ACCOUNTS
  //SET THE SCHEMA
  constructor(data) {
    this.Id=data.Id;
    this.Code=data.Code;
    this.Account=data.Account;
    this.IsLocked=data.IsLocked;
    this.AccountType=data.AccountType;
  }

  /****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 29, 2023
  PURPOSE              : ADD DATA
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : add(data)
  ****************************************************************/
  static async add(data) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        INSERT INTO [MstAccount]( Code, Account, IsLocked, AccountType)
        VALUES ( @Code, @Account, @IsLocked, @AccountType)`;
      request
        .input('Code', sql.NVarChar(50), data.Code)
        .input('Account', sql.NVarChar(100), data.Account)
        .input('IsLocked', sql.Bit, data.IsLocked || 0)
        .input('AccountType', sql.NVarChar(50), data.AccountType || null);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;  // Rows were affected, indicating successful insertion
     else return false;// No rows were affected, indicating insertion failed
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE

 /****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : September 23, 2023
  PURPOSE              : 
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : 
  ****************************************************************/
  static async update(Id, data) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        UPDATE [MstAccount] SET
        Code = @Code, 
        Account = @Account, 
        IsLocked = @IsLocked, 
        AccountType = @AccountType 
        WHERE Id = @Id
      `;
      request
        .input('Id', sql.Int, Id)
        .input('Code', sql.NVarChar(50), data.Code)
        .input('Account', sql.NVarChar(100), data.Account)
        .input('IsLocked', sql.Bit, data.IsLocked || 0)
        .input('AccountType', sql.NVarChar(50), data.AccountType || null);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true; // Rows were affected, indicating successful update
      else return false; // No rows were affected, indicating update failed
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE
}//END CLASS

//EXPORT THE CLASS
module.exports = {
  Account: Account,
};

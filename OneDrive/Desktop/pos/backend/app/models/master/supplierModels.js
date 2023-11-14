//INCLUDE NECESSARY LIBRARY
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

// DEFINE THE MODEL
class Supplier {
  //SET THE SCHEMA
  constructor(data) {
    this.Id=data.Id;
    this.Supplier=data.Supplier;
    this.Address=data.Address;
    this.TelephoneNumber=data.TelephoneNumber;     
    this.CellphoneNumber=data.CellphoneNumber;
    this.FaxNumber=data.FaxNumber;
    this.TermId=data.TermId;
    this.TIN=data.TIN;
    this.AccountId=data.AccountId;
    this.EntryUserId=data.EntryUserId;
    this.EntryDateTime=data.EntryDateTime;
    this.UpdateUserId=data.UpdateUserId;
    this.UpdateDateTime=data.UpdateDateTime;
    this.IsLocked=data.IsLocked;
  }

  /****************************************************************
    STATUS               : WORKING
    DATE CREATED/UPDATED : September 20, 2023
    PURPOSE              : STATIC FUNCTION FOR CREATE or ADD DATA
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : create(data)
  ****************************************************************/
  static async add(data) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        INSERT INTO [MstSupplier](
          Supplier, Address, TelephoneNumber, CellphoneNumber, 
          FaxNumber, TermId, TIN,  AccountId,
          EntryUserId, EntryDateTime, UpdateUserId, UpdateDateTime, IsLocked
        )
        VALUES (
          @Supplier, @Address, @TelephoneNumber, @CellphoneNumber, 
          @FaxNumber, @TermId, @TIN,  @AccountId,
          @EntryUserId, @EntryDateTime, @UpdateUserId, @UpdateDateTime, @IsLocked
        )
      `;
      request
        .input('Supplier', sql.NVarChar(100), data.Supplier)
        .input('Address', sql.NVarChar(255), data.Address)
        .input('TelephoneNumber', sql.NVarChar(50), data.TelephoneNumber)
        .input('CellphoneNumber', sql.NVarChar(50), data.CellphoneNumber)
        .input('FaxNumber', sql.NVarChar(50), data.FaxNumber)
        .input('TermId', sql.Int, data.TermId)
        .input('TIN', sql.NVarChar(50), data.TIN)
        .input('AccountId', sql.Int, data.AccountId || 0)
        .input('EntryUserId', sql.Int, data.EntryUserId)
        .input('EntryDateTime', sql.DateTime, data.EntryDateTime)
        .input('UpdateUserId', sql.Int, data.UpdateUserId)
        .input('UpdateDateTime', sql.DateTime, data.UpdateDateTime)
        .input('IsLocked', sql.Bit, data.IsLocked || 0);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0)  return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE

  /****************************************************************
    STATUS               : WORKING
    DATE CREATED/UPDATED : September 22, 2023
    PURPOSE              : STATIC FUNCTION FOR UPDATE or EDIT DATA
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : update(Id, data)
  ****************************************************************/
  static async update(Id, data) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        UPDATE [MstSupplier] SET
        Supplier = @Supplier, 
        Address = @Address, 
        TelephoneNumber = @TelephoneNumber, 
        CellphoneNumber = @CellphoneNumber, 
        FaxNumber = @FaxNumber,
        TermId = @TermId, 
        TIN = @TIN, 
        AccountId = @AccountId,
        EntryUserId = @EntryUserId, 
        EntryDateTime = @EntryDateTime, 
        UpdateUserId = @UpdateUserId, 
        UpdateDateTime = @UpdateDateTime, 
        IsLocked = @IsLocked
        WHERE Id = @Id
      `;
      request
      .input('Id', sql.Int, Id)
      .input('Supplier', sql.NVarChar(100), data.Supplier)
      .input('Address', sql.NVarChar(255), data.Address)
      .input('TelephoneNumber', sql.NVarChar(50), data.TelephoneNumber)
      .input('CellphoneNumber', sql.NVarChar(50), data.CellphoneNumber)
      .input('FaxNumber', sql.NVarChar(50), data.FaxNumber)
      .input('TermId', sql.Int, data.TermId)
      .input('TIN', sql.NVarChar(50), data.TIN)
      .input('AccountId', sql.Int, data.AccountId || 0)
      .input('EntryUserId', sql.Int, data.EntryUserId)
      .input('EntryDateTime', sql.DateTime, data.EntryDateTime)
      .input('UpdateUserId', sql.Int, data.UpdateUserId)
      .input('UpdateDateTime', sql.DateTime, data.UpdateDateTime)
      .input('IsLocked', sql.Bit, data.IsLocked || 0);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE
}//END CLASS

//EXPORT THE CLASS
module.exports = {
  Supplier: Supplier,
};

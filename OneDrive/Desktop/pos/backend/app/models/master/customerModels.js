//INCLUDE NECESSARY LIBRARY
const sql = require('mssql');
const db = require("../../database/db");

class Customer {// DEFINE THE MODEL
  //SET THE SCHEMA
  constructor(data) {
    this.Id=data.Id;
    this.Customer=data.Customer;
    this.Address=data.Address;
    this.ContactPerson=data.ContactPerson;     
    this.ContactNumber=data.ContactNumber;
    this.CreditLimit=data.CreditLimit;
    this.TermId=data.ermId;
    this.TIN=data.TIN;
    this.WithReward=data.WithReward;
    this.RewardNumber=data.RewardNumber;
    this.RewardConversion=data.RewardConversion;
    this.AccountId=data.AccountId;
    this.EntryUserId=data.EntryUserId;
    this.EntryDateTime=data.EntryDateTime;
    this.UpdateUserId=data.UpdateUserId;
    this.UpdateDateTime=data.UpdateDateTime;
    this.IsLocked=data.IsLocked;
    this.DefaultPriceDescription=data.DefaultPriceDescription;
    this.CustomerCode=data.CustomerCode;
  }

  /****************************************************************
    STATUS               : WORKING
    DATE CREATED/UPDATED : September 20, 2023
    PURPOSE              : STATIC FUNCTION FOR CREATE or ADD DATA
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : create(data)
  ****************************************************************/
  static async create(data) {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        INSERT INTO [MstCustomer](
            Customer, Address, ContactPerson, ContactNumber, CreditLimit,
            TermId, TIN, WithReward, RewardNumber, RewardConversion, AccountId,
            EntryUserId, EntryDateTime, UpdateUserId, UpdateDateTime, IsLocked,
            DefaultPriceDescription, CustomerCode
        )
        VALUES (
          @Customer, @Address, @ContactPerson, @ContactNumber, @CreditLimit,
          @TermId, @TIN, @WithReward, @RewardNumber, @RewardConversion, @AccountId,
          @EntryUserId, @EntryDateTime, @UpdateUserId, @UpdateDateTime, @IsLocked,
          @DefaultPriceDescription, @CustomerCode
        )
      `;
      request
      .input('Customer', sql.NVarChar(50), data.Customer)
      .input('Address', sql.NVarChar(255), data.Address)
      .input('ContactPerson', sql.NVarChar(255), data.ContactPerson)
      .input('ContactNumber', sql.NVarChar(255), data.ContactNumber)
      .input('CreditLimit', sql.Decimal(18, 5), data.CreditLimit || 0)
      .input('TermId', sql.Int, data.TermId)
      .input('TIN', sql.NVarChar(50), data.TIN)
      .input('WithReward', sql.Bit, data.WithReward || 0)
      .input('RewardNumber', sql.NVarChar(50), data.RewardNumber || null)
      .input('RewardConversion', sql.Decimal(18, 5), data.RewardConversion || 0)
      .input('AccountId', sql.Int, data.AccountId || 0)
      .input('EntryUserId', sql.Int, data.EntryUserId)
      .input('EntryDateTime', sql.DateTime, data.EntryDateTime)
      .input('UpdateUserId', sql.Int, data.UpdateUserId)
      .input('UpdateDateTime', sql.DateTime, data.UpdateDateTime)
      .input('IsLocked', sql.Bit, data.IsLocked || 0)
      .input('DefaultPriceDescription', sql.NVarChar(50), data.DefaultPriceDescription || null)
      .input('CustomerCode', sql.Int, data.CustomerCode || null);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true; // Rows were affected, indicating successful insertion
      else return false; // No rows were affected, indicating insertion failed
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE


  /****************************************************************
    STATUS               : WORKING
    DATE CREATED/UPDATED : September 20, 2023
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
        UPDATE [MstCustomer] SET
        Customer = @Customer, 
        Address = @Address, 
        ContactPerson = @ContactPerson, 
        ContactNumber = @ContactNumber, 
        CreditLimit = @CreditLimit,
        TermId = @TermId, 
        TIN = @TIN, 
        WithReward = @WithReward, 
        RewardNumber = @RewardNumber, 
        RewardConversion = @RewardConversion, 
        AccountId = @AccountId,
        EntryUserId = @EntryUserId, 
        EntryDateTime = @EntryDateTime, 
        UpdateUserId = @UpdateUserId, 
        UpdateDateTime = @UpdateDateTime, 
        DefaultPriceDescription = @DefaultPriceDescription,
        CustomerCode = @CustomerCode
        WHERE Id = @Id
      `;
      request
        .input('Id', sql.Int, Id)
        .input('Customer', sql.NVarChar(50), data.Customer)
        .input('Address', sql.NVarChar(255), data.Address)
        .input('ContactPerson', sql.NVarChar(255), data.ContactPerson)
        .input('ContactNumber', sql.NVarChar(255), data.ContactNumber)
        .input('CreditLimit', sql.Decimal(18, 5), data.CreditLimit || 0)
        .input('TermId', sql.Int, data.TermId)
        .input('TIN', sql.NVarChar(50), data.TIN)
        .input('WithReward', sql.Bit, data.WithReward || 0)
        .input('RewardNumber', sql.NVarChar(50), data.RewardNumber || null)
        .input('RewardConversion', sql.Decimal(18, 5), data.RewardConversion || 0)
        .input('AccountId', sql.Int, data.AccountId || 0)
        .input('EntryUserId', sql.Int, data.EntryUserId)
        .input('EntryDateTime', sql.DateTime, data.EntryDateTime)
        .input('UpdateUserId', sql.Int, data.UpdateUserId)
        .input('UpdateDateTime', sql.DateTime, data.UpdateDateTime)
        .input('DefaultPriceDescription', sql.NVarChar(50), data.DefaultPriceDescription || null)
        .input('CustomerCode', sql.Int, data.CustomerCode || null);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE
}//END CLASS

//EXPORT THE CLASS
module.exports = {
  Customer: Customer,
};

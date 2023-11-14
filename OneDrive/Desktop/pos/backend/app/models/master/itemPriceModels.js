//INCLUDE DATABASE CONNECTION
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

// Define the Item model
class ItemPrice {
    //SET SCHEMA
  constructor(data) {
    this.Id=data.Id;
    this.PriceDescription=data.PriceDescription;
    this.Price=data.Price;
    this.TriggerQuantity=data.TriggerQuantity;
  }//CONSTRUCTOR
  /****************************************************************
    STATUS               : 
    DATE CREATED/UPDATED : October 09, 2023
    PURPOSE              : STATIC FUNCTION FOR CREATE or ADD DATA
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : create(data)
  ****************************************************************/
    static async add(dataList) {
      let pool;
      let transaction;
      try {
        if (!dataList || !Array.isArray(dataList) || dataList.length === 0) {
          throw new Error('Invalid or empty dataList.');
        }

        pool = await db.initializePool(); // SET DATABASE CONNECTION
        transaction = new sql.Transaction(pool);
        await transaction.begin();

        for (const data of dataList) {
          const request = new sql.Request(transaction); // Create a new request for each iteration
          const query = `
            INSERT INTO [MstItemPrice](ItemId, PriceDescription, Price, TriggerQuantity)
            VALUES ( @ItemId, @PriceDescription, @Price, @TriggerQuantity)`;
          request
            .input('ItemId', sql.Int, data.ItemId)
            .input('PriceDescription', sql.NVarChar(255), data.PriceDescription)
            .input('Price', sql.Decimal(18, 5), data.Price)
            .input('TriggerQuantity', sql.Decimal(18, 5), data.TriggerQuantity);
    
          await request.query(query);
        }
    
        await transaction.commit(); // COMMIT THE INSERTION
        return true;
      } catch (error) {
        if (transaction) {
          await transaction.rollback();
        }
        // Log the error for debugging purposes
        console.error('Error in add function:', error);
        throw error;
      } finally {
        if (pool) {
          pool.close();
        }
      }
    }
    
    /****************************************************************
    STATUS               : 
    DATE CREATED/UPDATED : October 09, 2023
    PURPOSE              : STATIC FUNCTION FOR UPDATE or EDIT DATA 
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : update(Id, item)
    *************************************s***************************/
    static async update(Id, data) {
      let pool;
      try {
          // Initialize the database connection pool
          pool = await db.initializePool();
  
          // Create a new database request
          const request = pool.request();
  
          // Define the SQL query for the update
          const query = `
              UPDATE [MstItemPrice] SET
                  ItemId = @ItemId, 
                  PriceDescription = @PriceDescription, 
                  Price = @Price, 
                  TriggerQuantity = @TriggerQuantity
              WHERE Id = @Id`;
  
          // Bind parameters to the query
          request
              .input('Id', sql.Int, Id)
              .input('ItemId', sql.Int, data.ItemId)
              .input('PriceDescription', sql.NVarChar(255), data.PriceDescription)
              .input('Price', sql.Decimal(18, 5), data.Price)
              .input('TriggerQuantity', sql.Decimal(18, 5), data.TriggerQuantity);
  
          // Execute the query
          const result = await request.query(query);
  
          // Check if any rows were affected (indicating a successful update)
          if (result.rowsAffected[0] > 0) {
              return true;
          } else {
              return false;
          }
      } catch (error) {
          // Handle errors and provide more context (e.g., the SQL query that caused the error)
          throw new Error(`Error updating item with Id ${Id}: ${error.message}`);
      } finally {
          if (pool) {
              pool.close();
          }
      }
  }//END FUNCTION  

  /****************************************************************
  STATUS               : Working
  DATE CREATED/UPDATED : October 21, 2023
  PURPOSE              : Will update previes FK ItemId into ItemCode
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, item)
  *************************************s***************************/
  static async updatePrevItemCode(Id, data) {
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
      const query = `UPDATE [MstItemPrice] SET
                        ItemId = @ItemId
                      WHERE Id = @Id`;
      request
        .input('Id', sql.Int, Id)
        .input('ItemId', sql.NVarChar(255), data);
      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) {
      throw error;
    } finally {
      if (pool) pool.close();
    }
  }//END FUNCTION HERE
      
}//CLASS

//EXPORT THE CLASS
module.exports = {
    ItemPrice: ItemPrice,
  };
  
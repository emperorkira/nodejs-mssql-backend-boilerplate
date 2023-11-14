//INCLUDE NECESSARY LIBRARY
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

//DEFINE THE MODEL
class DiscountItem {
  //SET THE SCHEMA
  constructor(data) {
    this.Id=data.Id;
    this.DiscountId=data.DiscountId;
    this.ItemId=data.ItemId;
    this.IsAutoDiscount=data.IsAutoDiscount;
  }
  /****************************************************************
    STATUS               : WORKING
    DATE CREATED/UPDATED : September 21, 2023
    PURPOSE              : STATIC FUNCTION FOR CREATE or ADD DATA
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : create(data)
  ****************************************************************/
  static async add(data) {
    let pool;
    try {
      pool = await db.initializePool();       //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `INSERT INTO [MstDiscountItem] (DiscountId, ItemId, IsAutoDiscount) VALUES (@DiscountId, @ItemId, @IsAutoDiscount) `;
      request
        .input('DiscountId', sql.Int, data.DiscountId)
        .input('ItemId', sql.Int, data.ItemId  )
        .input('IsAutoDiscount', sql.Bit, data.IsAutoDiscount || 0);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE

  /****************************************************************
    STATUS               : TO BE TESTED
    DATE CREATED/UPDATED : September 21, 2023
    PURPOSE              : STATIC FUNCTION FOR UPDATE or EDIT DATA
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : update(id, data)
  ****************************************************************/
  static async update(Id, data) {
    let pool;
    try {
      pool = await db.initializePool();       //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        UPDATE [MstDiscountItem] SET
        DiscountId = @DiscountId, 
        ItemId = @ItemId,
        IsAutoDiscount = @IsAutoDiscount
        WHERE Id = @Id
      `;
      request
        .input('Id', sql.Int, Id) // Assuming there's an 'Id' field to specify the record to update
        .input('DiscountId', sql.Int, data.DiscountId)
        .input('ItemId', sql.Int, data.ItemId  )
        .input('IsAutoDiscount', sql.Bit, data.IsAutoDiscount || 0);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); } // Release the connection back to the pool
  }//END FUNCTION HERE

  /****************************************************************
  STATUS               : Working
  DATE CREATED/UPDATED : October 21, 2023
  PURPOSE              : Will update previous FK DiscountId into DiscountCode
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, item)
  *************************************s***************************/
  static async updatePrevDiscountCode(Id, data) {
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
      const query = `UPDATE [MstDiscountItem] SET
                      DiscountId = @DiscountCode
                    WHERE Id = @Id`;
      request
        .input('Id', sql.Int, Id)
        .input('DiscountCode', sql.NVarChar(255), data);
      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) {
      throw error;
    } finally {
      if (pool) pool.close();
    }
  }//END FUNCTION
  
}//END CLASS

//EXPORT CLASS
module.exports = {
  DiscountItem: DiscountItem,
};

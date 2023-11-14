const db = require("../../database/db");
const sql = require('mssql');

// DEFINE THE MODEL
class AccessRights {
  constructor(data) { //SET THE SCHEMA
    this.Id=data.Id;
    this.FormId=data.FormId;
    this.UserId=data.UserId;
    this.CanDelete=data.CanDelete;     
    this.CanAdd=data.CanAdd;
    this.CanLock=data.CanLock;
    this.CanUnlock=data.CanUnlock;
    this.CanPrint=data.CanPrint;
    this.CanPreview=data.CanPreview;
    this.CanEdit=data.CanEdit;
    this.CanTender=data.CanTender;
    this.CanDiscount=data.CanDiscount;
    this.CanView=data.CanView;
    this.CanSplit=data.CanSplit;
    this.CanCancel=data.CanCancel;
    this.CanReturn=data.CanReturn;
  }
  /****************************************************************
    STATUS               :
    DATE CREATED/UPDATED : October 2, 2023
    PURPOSE              : ADD A SPECIFIC RIGHTS TO A USER
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : add(data)
    SPEED                : add ing 121 access rights in 1678ms
  ****************************************************************/
    static async addBulkAccessRights(UserCode, dataList) {
      let pool;
      let transaction;
    
      try {
        pool = await db.initializePool(); // SET DATABASE CONNECTION
        transaction = new sql.Transaction(pool);
    
        await transaction.begin();
    
        // Define batch size (e.g., 100 records per batch)
        const batchSize = 15;
        for (let i = 0; i < dataList.length; i += batchSize) {
          const batch = dataList.slice(i, i + batchSize);
          const request = new sql.Request(transaction); // Create a new request for each batch
    
          const query = `
            INSERT INTO [MstUserForm](
              FormId, UserId, CanDelete, CanAdd, CanLock, CanUnlock, CanPrint, CanPreview, 
              CanEdit, CanTender, CanDiscount, CanView, CanSplit, CanCancel, CanReturn)
            VALUES ( @FormId${i}, @UserId${i}, @CanDelete${i}, @CanAdd${i}, @CanLock${i}, @CanUnlock${i}, @CanPrint${i}, 
              @CanPreview${i}, 
              @CanEdit${i}, @CanTender${i}, @CanDiscount${i}, @CanView${i}, @CanSplit${i}, @CanCancel${i}, @CanReturn${i})`;
    
            for (let j = 0; j < batch.length; j++) {
              const data = batch[j];
              request.input(`FormId${i +j}`, sql.Int, data.FormId);
              request.input(`UserId${i +j}`, sql.Int, UserCode);
              request.input(`CanDelete${i +j}`, sql.Int, data.CanDelete)
              request.input(`CanAdd${i +j}`, sql.Int, data.CanAdd)
              request.input(`CanLock${i +j}`, sql.Int, data.CanLock)
              request.input(`CanUnlock${i +j}`, sql.Int, data.CanUnlock)
              request.input(`CanPrint${i +j}`, sql.Int, data.CanPrint)
              request.input(`CanPreview${i +j}`, sql.Int, data.CanPreview)
              request.input(`CanEdit${i +j}`, sql.Int, data.CanEdit)
              request.input(`CanTender${i +j}`, sql.Int, data.CanTender)
              request.input(`CanDiscount${i +j}`, sql.Int, data.CanDiscount)
              request.input(`CanView${i +j}`, sql.Int, data.CanView)
              request.input(`CanSplit${i +j}`, sql.Int, data.CanSplit)
              request.input(`CanCancel${i +j}`, sql.Int, data.CanCancel)
              request.input(`CanReturn${i +j}`, sql.Int, data.CanReturn);
    
            await request.query(query);
          }
        }
    
        await transaction.commit();
        return true;
      } catch (error) {
        if (transaction) {
          await transaction.rollback();
        }
        throw error;
      } finally {
        if (pool) {
          pool.close();
        }
      }
    }
    
  
  /*  SPEED 2.7s
  static async addBulkAccessRights(UserId, dataList) {
      let pool;
      let transaction;
    
      try {
        pool = await db.initializePool(); // SET DATABASE CONNECTION
        transaction = new sql.Transaction(pool);
    
        await transaction.begin();
    
        for (const data of dataList) {
          const request = new sql.Request(transaction); // Create a new request for each iteration
    
          const query = `
            INSERT INTO [MstUserForm](
              FormId, UserId, CanDelete, CanAdd, CanLock, CanUnlock, CanPrint, CanPreview, 
              CanEdit, CanTender, CanDiscount, CanView, CanSplit, CanCancel, CanReturn)
            VALUES ( @FormId, @UserId, @CanDelete, @CanAdd, @CanLock, @CanUnlock, @CanPrint, @CanPreview, 
              @CanEdit, @CanTender, @CanDiscount, @CanView, @CanSplit, @CanCancel, @CanReturn)`;
          request
            .input('FormId', sql.Int, data.FormId)
            .input('UserId', sql.Int, UserId)
            .input('CanDelete', sql.Int, data.CanDelete)
            .input('CanAdd', sql.Int, data.CanAdd)
            .input('CanLock', sql.Int, data.CanLock)
            .input('CanUnlock', sql.Int, data.CanUnlock)
            .input('CanPrint', sql.Int, data.CanPrint)
            .input('CanPreview', sql.Int, data.CanPreview)
            .input('CanEdit', sql.Int, data.CanEdit)
            .input('CanTender', sql.Int, data.CanTender)
            .input('CanDiscount', sql.Int, data.CanDiscount)
            .input('CanView', sql.Int, data.CanView)
            .input('CanSplit', sql.Int, data.CanSplit)
            .input('CanCancel', sql.Int, data.CanCancel)
            .input('CanReturn', sql.Int, data.CanReturn);
    
          await request.query(query);
        }
    
        await transaction.commit();
        return true;
      } catch (error) {
        if (transaction) {
          await transaction.rollback();
        }
        throw error;
      } finally {
        if (pool) {
          pool.close();
        }
      }
    }//END FUNCTION
*/
  /****************************************************************
    STATUS               :
    DATE CREATED/UPDATED : October 19, 2023
    PURPOSE              : update a list of accesst rights in array
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : updateBulkAccessRights(Id, dataList)
  ****************************************************************/
    static async updateBulkAccessRights(UserId, dataList) {
      let pool;
      let transaction;
    
      try {
        pool = await db.initializePool(); // SET DATABASE CONNECTION
        transaction = new sql.Transaction(pool);
    
        await transaction.begin();
    
        // Define batch size (e.g., 100 records per batch)
        const batchSize = 15;
        for (let i = 0; i < dataList.length; i += batchSize) {
          const batch = dataList.slice(i, i + batchSize);
          const request = new sql.Request(transaction); // Create a new request for each batch
    
          for (let j = 0; j < batch.length; j++) {
            const data = batch[j];
            const query = `
              UPDATE [MstUserForm] SET
                FormId = @FormId${i + j}, 
                CanDelete = @CanDelete${i + j}, 
                CanAdd = @CanAdd${i + j}, 
                CanLock = @CanLock${i + j},
                CanUnlock = @CanUnlock${i + j}, 
                CanPrint = @CanPrint${i + j}, 
                CanPreview = @CanPreview${i + j}, 
                CanEdit = @CanEdit${i + j}, 
                CanTender = @CanTender${i + j}, 
                CanDiscount = @CanDiscount${i + j}, 
                CanView = @CanView${i + j}, 
                CanSplit = @CanSplit${i + j},
                CanCancel = @CanCancel${i + j}, 
                CanReturn = @CanReturn${i + j}
              WHERE Id = @Id${i + j} AND UserId = @UserId${i + j}`;
    
            request
              .input(`Id${i + j}`, sql.Int, data.Id)
              .input(`UserId${i + j}`, sql.Int, UserId)
              .input(`FormId${i + j}`, sql.Int, data.FormId)
              .input(`CanDelete${i + j}`, sql.Int, data.CanDelete)
              .input(`CanAdd${i + j}`, sql.Int, data.CanAdd)
              .input(`CanLock${i + j}`, sql.Int, data.CanLock)
              .input(`CanUnlock${i + j}`, sql.Int, data.CanUnlock)
              .input(`CanPrint${i + j}`, sql.Int, data.CanPrint)
              .input(`CanPreview${i + j}`, sql.Int, data.CanPreview)
              .input(`CanEdit${i + j}`, sql.Int, data.CanEdit)
              .input(`CanTender${i + j}`, sql.Int, data.CanTender)
              .input(`CanDiscount${i + j}`, sql.Int, data.CanDiscount)
              .input(`CanView${i + j}`, sql.Int, data.CanView)
              .input(`CanSplit${i + j}`, sql.Int, data.CanSplit)
              .input(`CanCancel${i + j}`, sql.Int, data.CanCancel)
              .input(`CanReturn${i + j}`, sql.Int, data.CanReturn);
    
            await request.query(query);
          }
        }
    
        await transaction.commit();
        return true;
      } catch (error) {
        if (transaction) {
          await transaction.rollback();
        }
        throw error;
      } finally {
        if (pool) {
          pool.close();
        }
      }
    }
    
 /*SPEED : 2.6s
static async updateBulkAccessRights(UserId, dataList) {
  let pool;
  let transaction;

  try {
    pool = await db.initializePool(); // SET DATABASE CONNECTION
    transaction = new sql.Transaction(pool);

    await transaction.begin();

    for (const data of dataList) {
      const request = new sql.Request(transaction); // Create a new request for each iteration

      const query = `
        UPDATE [MstUserForm] SET
          FormId = @FormId, 
          CanDelete = @CanDelete, 
          CanAdd = @CanAdd, 
          CanLock = @CanLock,
          CanUnlock = @CanUnlock, 
          CanPrint = @CanPrint, 
          CanPreview = @CanPreview, 
          CanEdit = @CanEdit, 
          CanTender = @CanTender, 
          CanDiscount = @CanDiscount, 
          CanView = @CanView, 
          CanSplit = @CanSplit,
          CanCancel = @CanCancel, 
          CanReturn = @CanReturn
        WHERE Id = @Id AND UserId = @UserId`;
      request
        .input('Id', sql.Int, data.Id)
        .input('UserId', sql.Int, UserId)
        .input('FormId', sql.Int, data.FormId)
        .input('CanDelete', sql.Int, data.CanDelete)
        .input('CanAdd', sql.Int, data.CanAdd)
        .input('CanLock', sql.Int, data.CanLock)
        .input('CanUnlock', sql.Int, data.CanUnlock)
        .input('CanPrint', sql.Int, data.CanPrint)
        .input('CanPreview', sql.Int, data.CanPreview)
        .input('CanEdit', sql.Int, data.CanEdit)
        .input('CanTender', sql.Int, data.CanTender)
        .input('CanDiscount', sql.Int, data.CanDiscount)
        .input('CanView', sql.Int, data.CanView)
        .input('CanSplit', sql.Int, data.CanSplit)
        .input('CanCancel', sql.Int, data.CanCancel)
        .input('CanReturn', sql.Int, data.CanReturn);

      await request.query(query);
    }

    await transaction.commit();
    return true;
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  } finally {
    if (pool) {
      pool.close();
    }
  }
}//END FUNCTION

    */
    
  /****************************************************************
    STATUS               :
    DATE CREATED/UPDATED : October 2, 2023
    PURPOSE              : UPDATE AN ACTION //i.e CanDelete from 0 to 1
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : add(data)
  ****************************************************************/
    static async updateAction(Id, Field, Data) {
      let pool;
      //Field=String(Field);
      try {
        pool = await db.initializePool(); // SET DATABASE CONNECTION
        const request = pool.request(); // SET DATABASE REQUEST
        const query = `
          UPDATE [MstUserForm] SET
            ${Field} = @Data
          WHERE Id = @Id
        `;
        request
          .input('Id', sql.Int, Id)
          .input('Data', sql.Int, Data); // Use 'Data' as the parameter name for the 'Data' input
    
        const result = await request.query(query);
        if (result.rowsAffected[0] > 0) return true;
        else return false;
      } catch (error) {
        throw error;
      } finally {
        if (pool) pool.close();
      }
    }//END FUNCTION HERE
    
  /****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 2, 2023
  PURPOSE              : CHECK USER IF USER HAS THIS ACCESS RIGHT
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : get(Id, tableName)
  ****************************************************************/
  static async checkAccessRight(FormId, UserId) {
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
      const query = `SELECT *
                      FROM MstUserForm
                      WHERE FormId = @FormId AND UserId = @UserId`;
      request
        .input('FormId', sql.Int, FormId)
        .input('UserId', sql.Int, UserId);
  
      const result = await request.query(query);
      return result.recordset.length > 0;
    } catch (error) {
      console.error('Error in checkAccessRight function:', error);
      throw error; // You can also handle the error more gracefully here if needed
    } finally {
      if (pool) {
        try {
          await pool.close(); // Release the connection back to the pool
        } catch (closeError) {
          console.error('Error closing the connection:', closeError);
        }
      }
    }
  }//END FUNCTION
  /****************************************************************
  STATUS               : Working
  DATE CREATED/UPDATED : October 21, 2023
  PURPOSE              : Will update previes FK UserId into UserCode
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : update(Id, item)
  *************************************s***************************/
  static async updatePrevUserCode(Id, data) {
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
      const query = `UPDATE [MstUserForm] SET
                        UserId = @UserCode
                      WHERE UserId = @UserId`;
      request
        .input('UserId', sql.Int, Id)
        .input('UserCode', sql.NVarChar(255), data);
      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) {
      throw error;
    } finally {
      if (pool) pool.close();
    }
  }//END FUNCTION HERE
}

module.exports = {
  AccessRights : AccessRights
}
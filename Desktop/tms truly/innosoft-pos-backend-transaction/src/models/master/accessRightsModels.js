const o6462 = require("../../database/db"), o73716C = require('mssql');

// DEFINE THE MODEL
class o61637372676874 {
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
  // add bulk access rights
  static async f6164626C6B(UserId, dataList) {
    let pool, transaction;
    try {
      pool = await o6462.f706C696E6974(); pool.setMaxListeners(15);
      transaction = new o73716C.Transaction(pool);
      await transaction.begin();
      const batchSize = 15;
      const request = new o73716C.Request(transaction);
      for (let i = 0; i < dataList.length; i += batchSize) {
        const batch = dataList.slice(i, i + batchSize);
        const placeholders = batch.map((_, index) => `(
          @FormId${i + index}, 
          @UserId${i + index},  
          @CanDelete${i + index}, 
          @CanAdd${i + index}, 
          @CanLock${i + index}, 
          @CanUnlock${i + index}, 
          @CanPrint${i + index}, 
          @CanPreview${i + index}, 
          @CanEdit${i + index}, 
          @CanTender${i + index}, 
          @CanDiscount${i + index}, 
          @CanView${i + index}, 
          @CanSplit${i + index}, 
          @CanCancel${i + index}, 
          @CanReturn${i + index}
        )`).join(',');
  
        const query = `
          INSERT INTO [MstUserForm](FormId, UserId, CanDelete, CanAdd, CanLock, CanUnlock, CanPrint, CanPreview, 
            CanEdit, CanTender, CanDiscount, CanView, CanSplit, CanCancel, CanReturn) 
          VALUES ${placeholders}
        `;
  
        batch.forEach((data, index) => {
          request.input(`FormId${i + index}`, o73716C.Int, data.FormId);
          request.input(`UserId${i + index}`, o73716C.Int, UserId);
          request.input(`CanDelete${i + index}`, o73716C.Int, data.CanDelete);
          request.input(`CanAdd${i + index}`, o73716C.Int, data.CanAdd);
          request.input(`CanLock${i + index}`, o73716C.Int, data.CanLock);
          request.input(`CanUnlock${i + index}`, o73716C.Int, data.CanUnlock);
          request.input(`CanPrint${i + index}`, o73716C.Int, data.CanPrint);
          request.input(`CanPreview${i + index}`, o73716C.Int, data.CanPreview);
          request.input(`CanEdit${i + index}`, o73716C.Int, data.CanEdit);
          request.input(`CanTender${i + index}`, o73716C.Int, data.CanTender);
          request.input(`CanDiscount${i + index}`, o73716C.Int, data.CanDiscount);
          request.input(`CanView${i + index}`, o73716C.Int, data.CanView);
          request.input(`CanSplit${i + index}`, o73716C.Int, data.CanSplit);
          request.input(`CanCancel${i + index}`, o73716C.Int, data.CanCancel);
          request.input(`CanReturn${i + index}`, o73716C.Int, data.CanReturn);
        });
        await request.query(query);
      }
  
      // Move this line outside the loop
      await transaction.commit();
      return true;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    } finally {
      try {
        if (transaction) {
          await transaction.commit();
        }
      } catch (error) {
        console.error('Error during transaction commit:', error.message);
      } finally {
        if (pool) {
          await pool.close();
        }
      }
    }
  }// END HERE

  static async f75706474626C6B(UserId, dataList) {
    let pool;
    let transaction;
    try {
      pool = await o6462.f706C696E6974(); pool.setMaxListeners(15);
      transaction = new o73716C.Transaction(pool);
      await transaction.begin();
      const batchSize = 15;
      const request = new o73716C.Request(transaction);
      //
      for (let i = 0; i < dataList.length; i += batchSize) {
        const batch = dataList.slice(i, i + batchSize);
        const placeholders = batch
          .map((_, index) => `(
            @Id${i + index}, 
            @UserId${i + index},  
            @FormId${i + index}, 
            @CanDelete${i + index}, 
            @CanAdd${i + index}, 
            @CanLock${i + index}, 
            @CanUnlock${i + index}, 
            @CanPrint${i + index}, 
            @CanPreview${i + index}, 
            @CanEdit${i + index}, 
            @CanTender${i + index}, 
            @CanDiscount${i + index}, 
            @CanView${i + index}, 
            @CanSplit${i + index}, 
            @CanCancel${i + index}, 
            @CanReturn${i + index}
          )`).join(',');
  
        const query = `
          UPDATE [MstUserForm] SET
            FormId = cases.FormId,
            CanDelete = cases.CanDelete,
            CanAdd = cases.CanAdd,
            CanLock = cases.CanLock,
            CanUnlock = cases.CanUnlock, 
            CanPrint = cases.CanPrint, 
            CanPreview = cases.CanPreview, 
            CanEdit = cases.CanEdit, 
            CanTender = cases.CanTender, 
            CanDiscount = cases.CanDiscount, 
            CanView = cases.CanView, 
            CanSplit = cases.CanSplit,
            CanCancel = cases.CanCancel, 
            CanReturn = cases.CanReturn
          FROM (VALUES ${placeholders}) AS cases(Id, UserId, FormId, CanDelete, CanAdd, CanLock, CanUnlock, 
            CanPrint, CanPreview, CanEdit, CanTender, CanDiscount, CanView, CanSplit, CanCancel, CanReturn ) 
          WHERE [MstUserForm].[Id] = cases.Id AND [MstUserForm].[UserId] = cases.[UserId]`;
  
        batch.forEach((data, index) => {
          request.input(`Id${i + index}`, o73716C.Int, data.Id);
          request.input(`UserId${i + index}`, o73716C.Int, UserId);
          request.input(`FormId${i + index}`, o73716C.Int, data.FormId);
          request.input(`CanDelete${i + index}`, o73716C.Int, data.CanDelete);
          request.input(`CanAdd${i + index}`, o73716C.Int, data.CanAdd);
          request.input(`CanLock${i + index}`, o73716C.Int, data.CanLock);
          request.input(`CanUnlock${i + index}`, o73716C.Int, data.CanUnlock);
          request.input(`CanPrint${i + index}`, o73716C.Int, data.CanPrint);
          request.input(`CanPreview${i + index}`, o73716C.Int, data.CanPreview);
          request.input(`CanEdit${i + index}`, o73716C.Int, data.CanEdit);
          request.input(`CanTender${i + index}`, o73716C.Int, data.CanTender);
          request.input(`CanDiscount${i + index}`, o73716C.Int, data.CanDiscount);
          request.input(`CanView${i + index}`, o73716C.Int, data.CanView);
          request.input(`CanSplit${i + index}`, o73716C.Int, data.CanSplit);
          request.input(`CanCancel${i + index}`, o73716C.Int, data.CanCancel);
          request.input(`CanReturn${i + index}`, o73716C.Int, data.CanReturn);
        }); await request.query(query);
      } await transaction.commit();
      return true;
    } catch (error) {
      if (transaction) {await transaction.rollback();}
      throw error;
    } finally {
      if (pool) pool.close();
    }
  }//END FUNCTION

    static async updateBulkAccessRights2(UserId, dataList) {
      let pool;
      let transaction;
    
      try {
          pool = await o6462.f706C696E6974();
          pool.setMaxListeners(35);
          transaction = new o73716C.Transaction(pool);
          await transaction.begin();
          const batchSize = 35;
          const request = new o73716C.Request(transaction);
        
          for (let i = 0; i < dataList.length; i += batchSize) {
              const batch = dataList.slice(i, i + batchSize);
              const placeholders = batch
                .map((_, index) => `(
                  @Id${i + index}, 
                  @UserId${i + index},  
                  @FormId${i + index}
                )`).join(',');
        
              const query = `
                UPDATE [MstUserForm] 
                SET FormId = cases.FormId, 
                    UserId = cases.UserId
                FROM (VALUES ${placeholders}) AS cases(Id, UserId, FormId) 
                WHERE [MstUserForm].Id = cases.Id
              `;
        
              batch.forEach((data, index) => {
                  request.input(`Id${i + index}`, o73716C.Int, data.Id);
                  request.input(`UserId${i + index}`, o73716C.Int, UserId);
                  request.input(`FormId${i + index}`, o73716C.Int, data.FormId);
              });
              
              await request.query(query); // Move inside the loop
          }
        
          await transaction.commit(); // Commit outside the loop
          return true;
      } catch (error) {
          if (transaction) {
              await transaction.rollback();
          }
          throw error;
      } finally {
          try {
              if (pool) {
                  await pool.close();
              }
          } catch (error) {
              console.error('Error closing database connection:', error);
              throw new Error(`Error closing database connection: ${error.message}`);
          }
      }
  }// END FUNCTION

}// END CLASS

 /*
(async () => {
  try {
      const datalist = [
                        {
                            "Id": 636,
                            "FormId": 1
                        },
                        {
                            "Id": 637,
                            "FormId": 21
                        }
      ];
      const result = await o61637372676874.updateBulkAccessRights2(7, datalist); // Corrected function call
      console.log(result);
  } catch (error) {
      console.error('Error:', error.message);
  }
})();*/

module.exports = { o61637372676874 : o61637372676874 }
//INCLUDE NECESSARY LIBRARY
const sql = require('mssql');
const db = require("../../database/db"); //INCLUDE DATABASE CONNECTION

// DEFINE THE MODEL
class User {
  //SET THE SCHEMA
  constructor(data) {
    this.Id=data.Id;
    this.UserName=data.UserName;
    this.Password=data.Password;
    this.FullName=data.FullName;     
    this.UserCardNumber=data.UserCardNumber;
    this.EntryUserId=data.EntryUserId;
    this.EntryDateTime=data.EntryDateTime;
    this.UpdateUserId=data.UpdateUserId;
    this.UpdateDateTime=data.UpdateDateTime;
    this.IsLocked=data.IsLocked;
  }

  /****************************************************************
    STATUS               :
    DATE CREATED/UPDATED : September 24, 2023
    PURPOSE              : STATIC FUNCTION FOR CREATE or ADD DATA
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : add(data)
  ****************************************************************/
  static async add(UserCode,data) {
    UserCode=String(UserCode);
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query = `
        INSERT INTO [MstUser](
          UserName, Password, FullName, UserCardNumber,
          EntryUserId, EntryDateTime, UpdateUserId, UpdateDateTime, IsLocked, UserCode
        )
        VALUES (
          @UserName, @Password, @FullName, @UserCardNumber,
          @EntryUserId, @EntryDateTime, @UpdateUserId, @UpdateDateTime, @IsLocked, @UserCode
        )
      `;
      request
        .input('UserName', sql.NVarChar(255), data.UserName)
        .input('Password', sql.NVarChar(255), data.Password)
        .input('FullName', sql.NVarChar(255), data.FullName)
        .input('UserCardNumber', sql.NVarChar(255), data.UserCardNumber|| null)
        .input('EntryUserId', sql.Int, data.EntryUserId)
        .input('EntryDateTime', sql.DateTime, data.EntryDateTime)
        .input('UpdateUserId', sql.Int, data.UpdateUserId)
        .input('UpdateDateTime', sql.DateTime, data.UpdateDateTime)
        .input('IsLocked', sql.Bit, data.IsLocked || 0)
        .input('UserCode', sql.NVarChar(255), UserCode);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0)  return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE


  /****************************************************************
    STATUS               : 
    DATE CREATED/UPDATED : September 24, 2023
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
        UPDATE [MstUser] SET
          UserName = @UserName, 
          Password = @Password, 
          FullName = @FullName,
          UserCardNumber = @UserCardNumber,
          EntryUserId = @EntryUserId, 
          EntryDateTime = @EntryDateTime, 
          UpdateUserId = @UpdateUserId, 
          UpdateDateTime = @UpdateDateTime
        WHERE Id = @Id
      `;
      request
        .input('Id', sql.Int, Id)
        .input('UserName', sql.NVarChar(100), data.UserName)
        .input('Password', sql.NVarChar(255), data.Password)
        .input('FullName', sql.NVarChar(255), data.FullName)
        .input('UserCardNumber', sql.NVarChar(255), data.UserCardNumber|| null)
        .input('EntryUserId', sql.Int, data.EntryUserId)
        .input('EntryDateTime', sql.DateTime, data.EntryDateTime)
        .input('UpdateUserId', sql.Int, data.UpdateUserId)
        .input('UpdateDateTime', sql.DateTime, data.UpdateDateTime);

      const result = await request.query(query);
      if (result.rowsAffected[0] > 0) return true;
      else return false;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTION HERE

  /****************************************************************
    STATUS               : 
    DATE CREATED/UPDATED : September 24, 2023
    PURPOSE              : STATIC FUNCTION FOR DISPLAY USER ACCESS RIGHT
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : displayAccessRights()
  ****************************************************************/
  static async displayAccessRights() {
    let pool;
    try {
      pool = await db.initializePool(); //SET DATABASE CONNECTION
      const request = pool.request();         //SET DATABASE REQUEST
      const query =`SELECT 
                      MstUser.Id, 
                      MstUser.UserName, 
                      MstUser.IsLocked 
                    FROM MstUser 
                    WHERE MstUser.IsLocked='True'
                    ORDER BY MstUser.UserName; `;
      const result = await request.query(query);
      // Return only the data rows, not the entire result object
      if (result.recordset.length > 0) return result.recordset;
      else return null;
    } catch (error) { throw error; }
    finally { if (pool) pool.close(); }
  }//END FUNCTxION HERE

  /****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 2, 2023
  PURPOSE              : CHECK USER's inputted UserName before creating the users account
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : checkUsernameWithId(Id, UserName)
  ****************************************************************/
  static async checkUsername(Username) {
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
      const query = `SELECT *
                      FROM MstUser
                      WHERE Username = @Username`;
      request.input('Username', sql.NVarChar(255), Username);
  
      const result = await request.query(query);
      return result.recordset.length > 0;
    } catch (error) {
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
  }

  /****************************************************************
  STATUS               : 
  DATE CREATED/UPDATED : October 2, 2023
  PURPOSE              : CHECK USER's inputted UserName before Updating the UserName
  PROGRAMMER           : MARK DINGLASA
  FUNCTION NAME        : checkUsernameWithId(Id, UserName)
  ****************************************************************/
  static async checkUsernameWithId(Id, Username) {
    let pool;
    try {
      pool = await db.initializePool(); // SET DATABASE CONNECTION
      const request = pool.request(); // SET DATABASE REQUEST
      const query = `SELECT *
                      FROM MstUser
                      WHERE Id != @Id AND Username = @Username`;
      request
        .input('Id', sql.Int, Id)
        .input('Username', sql.NVarChar(255), Username);
  
      const result = await request.query(query);
      return result.recordset.length > 0;
    } catch (error) {
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
  }

  /****************************************************************
    STATUS               : 
    DATE CREATED/UPDATED : September 24, 2023
    PURPOSE              : STATIC FUNCTION FOR UPDATE or EDIT DATA
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : update(Id, data)
  ****************************************************************/
    static async updatePassword(Id, Password) {
      let pool;
      try {
        pool = await db.initializePool(); // SET DATABASE CONNECTION
        const request = pool.request(); // SET DATABASE REQUEST
        const query = `
          UPDATE [MstUser] SET
            Password = @Password
          WHERE Id = @Id
        `;
        request
          .input('Id', sql.Int, Id)
          .input('Password', sql.NVarChar(255), Password);
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
    DATE CREATED/UPDATED : October 20, 2023
    PURPOSE              : Update user table, insert UserCode and filled it
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : fillUserCode(Id, data)
  ****************************************************************/
    static async fillUserCode(Id, UserCode) {
      let pool;
      try {
        pool = await db.initializePool(); // SET DATABASE CONNECTION
        const request = pool.request(); // SET DATABASE REQUEST
        const query = `
          UPDATE [MstUser] SET
            UserCode = @UserCode
          WHERE Id = @Id
        `;
        request
          .input('Id', sql.Int, Id)
          .input('UserCode', sql.NVarChar(255), UserCode);
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
    STATUS               : Working
    DATE CREATED/UPDATED : October 21, 2023
    PURPOSE              : Will update previes FK DiscountId into DiscountCode
    PROGRAMMER           : MARK DINGLASA
    FUNCTION NAME        : update(Id, item)
    *************************************s***************************/
    static async updatePrevDiscountCode(Id, data) {
      let pool;
      try {
        pool = await db.initializePool(); // SET DATABASE CONNECTION
        const request = pool.request(); // SET DATABASE REQUEST
        const query = `UPDATE [MstDiscountItem] SET
                          DiscountId = @DiscountId
                        WHERE Id = @Id`;
        request
          .input('Id', sql.Int, Id)
          .input('DiscountId', sql.NVarChar(255), data);
        const result = await request.query(query);
        if (result.rowsAffected[0] > 0) return true;
        else return false;
      } catch (error) {
        throw error;
      } finally {
        if (pool) pool.close();
      }
    }//END FUNCTION HERE

}//END CLASS

//EXPORT THE CLASS
module.exports = {
  User: User,
};
